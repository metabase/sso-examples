import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  const loginWithOkta = () => {
    window.location.href = "http://localhost:3001/login";
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Start</Link>
            </li>
            <li>
              <button onClick={loginWithOkta}>Login with Okta</button>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Start />} />
        </Routes>
      </div>
    </Router>
  );
}

function Start() {
  return <h2>Welcome to the Metabase App</h2>;
}

export default App;
