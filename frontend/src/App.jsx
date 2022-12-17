import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { getUser, getAuthorization, getUserType } from './utils/userUtil';
import MatchCard from './components/Cards/Match/MatchCard';
import About from './pages/About';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import Test from './pages/Test';
import ReTakeTestPage from './pages/ReTakeTest';
const App = () => {
  const { setUserData } = useContext(GlobalContext);
  const { isLoadingFingerprint, data } = useVisitorData();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
 
  const initUser = async (id) => {
    const typeData = await getUserType(id);

    setUserData((prevUserData) => ({
      ...prevUserData,
      type: typeData.userType,
      id: id
    }));
    const authorization = await getAuthorization();
    if (authorization.success) { // Real user with cookie
      const authorizedUserData = await getUser(authorization.user.id, 'REAL');

      setUserData((prevUserData) => ({
        ...prevUserData,
        name: authorizedUserData.name,
        gender: authorizedUserData.gender,
        avatarIndex: authorizedUserData.avatar_index,
        email: authorizedUserData.email,
        dob: authorizedUserData.birth_date,
        id: authorizedUserData.internal_user_id,
        isAuthorized: true,
        type: 'REAL'
      }));
    } else if (typeData.userType === 'TMP') { // Get temp user data.
      const tmpUserData = await getUser(id, typeData.userType);
      setUserData((prevUserData) => ({
        ...prevUserData,
        name: tmpUserData.name,
        gender: tmpUserData.gender,
        avatarIndex: tmpUserData.avatar_index
      }));
    }
    setIsLoadingUser(false);
  };
  useEffect(() => {
    if (data) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        visitorId: data.visitorId,
      }));
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
              <Route index path="/test" element={<Test assessmentGroupId={1} />} />
              <Route index path="/retake-test" element={<ReTakeTestPage />} />
              <Route index path="/home" element={<ProtectedRoute component={<HomeScreen />} />} />
              <Route index path="/user" element={<ProtectedRoute component={<UserProfile />} />} />
              <Route index path="/editProfile" element={<ProtectedRoute component={<EditProfile />} />} />
              <Route index path="/about" element={<ProtectedRoute component={<About />} />} />
              <Route index path="/contact" element={<ProtectedRoute component={<Contact />} />} />
              <Route index path="/chart" element={<ProtectedRoute component={<RadarChart />} />} />
              <Route index path="/share/:userId" element={<ShareScreen />} />
              <Route index path="/cards" element={<ProtectedRoute component={<CardDeck />} />} />
              <Route index path="/matchCard" element={<MatchCard/>}/>
            </Routes>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;