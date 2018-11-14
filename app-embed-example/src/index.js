import React from "react";
import ReactDOM from "react-dom";

import "./reset.css";
import "./index.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import MetabaseAppEmbed from "./MetabaseAppEmbed";

const getAppPath = location =>
  [location.pathname, location.search, location.hash].join("");

const App = () => (
  <Router>
    <div>
      <nav style={{ background: "black" }}>
        <ul>
          <li>
            <NavLink exact to="/">
              <Logo />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/analytics">
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/analytics/question/new">
              New Question
            </NavLink>
          </li>
        </ul>
      </nav>
      <Route
        exact
        path="/"
        render={() => (
          <div style={{ padding: "2em" }}>
            <h2>
              Welcome to Metalbase
              <Logo />
            </h2>
            <p>
              <Link to="/analytics">View Metalbase Analytics</Link>
            </p>
          </div>
        )}
      />
      <Route
        path="/analytics"
        render={({ history, location, match }) => (
          <MetabaseAppEmbed
            base="http://localhost:3000"
            path={getAppPath(location).replace(/\/analytics/, "")}
            onLocationChange={location => {
              history.push(
                `/analytics${getAppPath(location).replace(/^\/$/, "")}`,
              );
            }}
            getAuthUrl={url =>
              `/api/auth/metabase?return_to=${encodeURIComponent(url)}`
            }
            navHeight={48}
          />
        )}
      />
    </div>
  </Router>
);

const Logo = ({ size = 24 }) => (
  <span style={{ fontSize: size }} role="img" aria-label="logo">
    🤘
  </span>
);

ReactDOM.render(<App />, document.getElementById("root"));
