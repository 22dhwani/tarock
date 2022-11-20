import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Assessment from "./components/Assessment/Assessment";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from './pages/UserProfile';
import Welcome from './pages/Welcome';
import SignInScreen from './pages/SignIn';
import HomeScreen from './pages/Home';
import MyCardScreen from './components/Cards/MyCard';
import RadarChart from './components/Charts/RadarChart';
import ShareScreen from './components/Cards/ShareCard';
import CardDeck from './pages/CardDeck';
import EditProfile from './pages/EditProfile';
import Loading from './components/Loading/Loading';
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from './context';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { getUser, isAuthorized } from './utils/userUtil';
import MatchCard from './components/Cards/MatchCard';
import About from './pages/About';
import Contact from './pages/Contact';
import AuthGuard from './components/AuthGuard';
const App = () => {
  const { userData, setUserData } = useContext(GlobalContext);
  const { isLoadingFingerprint, data } = useVisitorData();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const getUserType = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/status/${id}`)
    const data = await response.json();
    return data;
  }

  const getUserQuadra = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/card/${id}`)
    const data = await response.json();
    return data;
  }

  const getUserResultCode = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/card/user/${id}`)
    const data = await response.json();
    return data;
  }

  const initUser = async (id) => {
    const typeData = await getUserType(id);

    setUserData((prevUserData) => ({
      ...prevUserData,
      type: typeData.userType,
      id: typeData.id,

    }));
    const authorized = await isAuthorized();
    if (authorized) { // Real user with cookie
      const authorizedUserData = await getUser(typeData.id, typeData.userType);
      const resultCodeRes = await getUserResultCode(typeData.id);
      const resultCode = resultCodeRes[0].data[0].result_code;
      const quadraData = await getUserQuadra(resultCode);
      setUserData((prevUserData) => ({
        ...prevUserData,
        name: authorizedUserData.name,
        gender: authorizedUserData.gender,
        avatarIndex: authorizedUserData.avatar_index,
        email: authorizedUserData.email,
        dob: authorizedUserData.birth_date,
        id: authorizedUserData.internal_user_id,
        type: 'REAL',
        isAuthorized: true,
        quadra: quadraData.personality_socionic_quadra
      }));

    } else { // No authorized cookie, need to determine user type.
      if (typeData.userType != 'NEW') {
        const tmpUserData = await getUser(typeData.id, typeData.userType);
        setUserData((prevUserData) => ({
          ...prevUserData,
          name: tmpUserData.name,
          gender: tmpUserData.gender,
          avatarIndex: tmpUserData.avatar_index
        }));
      } else { // New user, set ID.
        setUserData((prevUserData) => ({
          ...prevUserData,
          id: id
        }));
      }
    }
    setIsLoadingUser(false);
  };

  useEffect(() => {
    if (data) {
      initUser(data.visitorId);
    }
  }, [data]);

  if (isLoadingFingerprint || isLoadingUser) {
    return <Loading />
  } else {
    return (
      <div className="min-vh-100" style={{
        backgroundColor: '#F3F3F3'
      }}>
        <div className="min-vh-100 mx-auto global-container">
          <Router>
            <Routes>
              <Route index path="/" element={<Welcome />} />
              <Route index path="/signin" element={<SignInScreen />} />
              <Route index path="/test" element={<Assessment assessmentGroupId={1} />} />
              <Route index path="/home" element={<AuthGuard>
                <HomeScreen />
              </AuthGuard>} />
              <Route index path="/user" element={<AuthGuard>
                <UserProfile />
              </AuthGuard>} />
              <Route index path="/editProfile" element={<AuthGuard>
                <EditProfile />
              </AuthGuard>} />
              <Route index path="/about" element={<AuthGuard>
                <About />
              </AuthGuard>} />
              <Route index path="/contact" element={<AuthGuard>
                <Contact />
              </AuthGuard>} />
              <Route index path="/myCard" element={<AuthGuard>
                <MyCardScreen />
              </AuthGuard>} />
              {/* <Route index path="/matchCard/:matchedUserId" element={<MatchCard/>}/> */}
              <Route index path="/chart" element={<AuthGuard>
                <RadarChart />
              </AuthGuard>} />
              <Route index path="/share/:userId" element={<AuthGuard>
                <ShareScreen />
              </AuthGuard>} />
              <Route index path="/cards" element={<AuthGuard>
                <CardDeck />
              </AuthGuard>} />
            </Routes>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
