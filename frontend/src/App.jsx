import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Assessment from "./components/Assessment/Assessment";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from './components/profileScreen/UserProfile';
import Welcome from './components/welcomeScreen/Welcome';
import SignInScreen from './components/signInScreen/SignInScreen';
import HomeScreen from './components/homeScreen/HomeScreen';
import MyCardScreen from './components/cardScreen/MyCardScreen';
import RadarChart from './components/Charts/RadarChart';
import ShareScreen from './components/cardScreen/ShareScreen';
import CardsScreen from './components/cardScreen/CardsScreen';
import EditProfile from './components/profileScreen/EditProfile';
import Loading from './components/common/Loading';
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from './context';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { getUser, isAuthorized } from './utils/userUtil';

const App = () => {
  const { setUserData } = useContext(GlobalContext);
  const { isLoadingFingerprint, data } = useVisitorData();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const getUserType = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/status/${id}`)
    const data = await response.json();
    return data;
  }

  const initUser = async (id) => {
    const typeData = await getUserType(id);
    setUserData((prevUserData) => ({
      ...prevUserData,
      type: typeData.userType,
      id: typeData.id
    }));
    const authorized = await isAuthorized();
    if (authorized) { // Real user with cookie
      const authorizedUserData = await getUser(typeData.id, typeData.userType);
      setUserData((prevUserData) => ({
        ...prevUserData,
        name: authorizedUserData.name,
        gender: authorizedUserData.gender,
        avatarIndex: authorizedUserData.avatar_index,
        email: authorizedUserData.email,
        dob: authorizedUserData.birth_date,
        id: authorizedUserData.internal_user_id,
        type: 'REAL',
        isAuthorized: true
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
    return <Loading/>;
  } else {
    return (
      <div className="vh-100 vw-100" style={{
        backgroundColor: '#F3F3F3'
      }}>
        <div className="vh-100 mx-auto global-container">
          <Router>

            <Routes>
              <Route index path="/test" element={<Assessment assessmentGroupId={1}/>}/>
              <Route index path="/user" element={<UserProfile/>}/>
              <Route index path="/home" element={<HomeScreen/>}/>
              <Route index path="/editProfile" element={ <EditProfile/> }/>
              <Route index path="/signin" element={<SignInScreen/>}/>
              <Route index path="/" element={<Welcome/>}/>
              <Route index path="/myCard" element={<MyCardScreen/>}/>
              <Route index path="/chart" element={<RadarChart/>}/>
              <Route index path="/share/:userId" element={<ShareScreen/>}/>
              <Route index path="/cards" element={<CardsScreen/>}/>
            </Routes>

          </Router>
        </div>
      </div>
    );
  }
}

export default App;
