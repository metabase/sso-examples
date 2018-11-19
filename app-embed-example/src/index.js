import React, { useState, useEffect, useRef } from "react";
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

const App = () => {
  const config = useFetch("/api/config");
  const navEl = useRef(null);
  const innerHeight = useInnerHeight();
  return (
    <Router>
      <div>
        <nav ref={navEl} style={{ background: "black" }}>
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
          render={({ history, location, match }) =>
            config && (
              <MetabaseAppEmbed
                base={config.METABASE_URL}
                path={getAppPath(location).replace(/\/analytics/, "")}
                onLocationChange={location => {
                  history.push(
                    `/analytics${getAppPath(location).replace(/^\/$/, "")}`,
                  );
                }}
                getAuthUrl={url =>
                  `/api/auth/metabase?return_to=${encodeURIComponent(url)}`
                }
                fitHeight={
                  innerHeight -
                  (navEl.current ? navEl.current.offsetHeight : 56)
                }
              />
            )
          }
        />
      </div>
    </Router>
  );
};

const Logo = ({ size = 24 }) => (
  <span style={{ fontSize: size }} role="img" aria-label="logo">
    🤘
  </span>
);

const useFetch = (...fetchArgs) => {
  const [value, setState] = useState(null);
  useEffect(async () => {
    setState(await fetch(...fetchArgs).then(r => r.json()));
  }, fetchArgs);
  return value;
};

function useInnerHeight() {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  useEffect(() => {
    const onResize = () => setInnerHeight(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return innerHeight;
}

ReactDOM.render(<App />, document.getElementById("root"));
