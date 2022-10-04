import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Assessment from "./components/Assessment";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from './components/profileScreen/UserProfile';
import Welcome from './components/welcomeScreen/Welcome';
import SignInScreen from './components/SignInScreen/SignInScreen';
function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function App() {
  return (
    <div className="min-vw-100" style={{
      backgroundColor: '#FBF2DC',
      height: 'fit-content'
    }}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={ <About/> }/>
          {/* <Route index path="/" element={ <Assessment assessment_group_id="1"/> }/> */}
          <Route index path="user" element={ <UserProfile/> }/>
          <Route index path="/" element={ <Welcome/> }/>
          <Route index path="signin" element={ <SignInScreen/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
