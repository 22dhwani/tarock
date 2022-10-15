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

import Loading from './components/common/Loading';
import { useContext, useEffect } from "react";
import { GlobalContext } from './context';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';


const App = () => {
  const { userId, setUserId } = useContext(GlobalContext);
  const { isLoading, data } = useVisitorData();
  useEffect(() => {
    if (data) {
      setUserId(data.visitorId);
    }
  }, [data]);
  if (isLoading) {
    return <Loading/>;
  }
  if (userId) {
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
