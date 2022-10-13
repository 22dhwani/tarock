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
import { GlobalContextProvider } from './context'

const App = () => {
  return (
      <div className="min-vw-100 min-vh-100" style={{
        backgroundColor: '#F3F3F3',
        height: 'fit-content'
      }}>
        <div className="min-vh-100 mx-auto" style={{
          maxWidth: '500px'
        }}>
          <Router>
            <GlobalContextProvider>
              <Routes>
                <Route index path="/test" element={ <Assessment assessmentGroupId={ 1 }/> }/>
                <Route index path="/user" element={ <UserProfile/> }/>
                <Route index path="/welcome" element={ <Welcome/> }/>
                <Route index path="/signin" element={ <SignInScreen/> }/>
                <Route index path="/" element={ <HomeScreen/> }/>
                <Route index path="/myCard" element={ <MyCardScreen/> }/>
                <Route index path="/chart" element={ <RadarChart/> }/>
                <Route index path="/share/:id" element={ <ShareScreen/> }/>
                <Route index path="/cards" element={ <CardsScreen/> }/>
              </Routes>
            </GlobalContextProvider>
          </Router>
        </div>
      </div>
  );
}

export default App;
