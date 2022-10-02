import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Assessment from "./components/Assessment";

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={ <About/> }/>
          <Route index path="/" element={ <Assessment assessment_group_id="1"/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
