const express = require("express");
const session = require("express-session");
const { ExpressOIDC } = require("@okta/oidc-middleware");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;

// Metabase configuration
const METABASE_SITE_URL = "http://localhost:3000";
const METABASE_SECRET_KEY = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

// Session configuration
app.use(
  session({
    secret: "your-session-secret",
    resave: true,
    saveUninitialized: false,
  })
);

// Okta OIDC setup
const oidc = new ExpressOIDC({
  issuer: "https://<yourinstances>/oauth2/default",
  client_id: "yourclientid",
  client_secret: "yoursecret",
  appBaseUrl: "http://localhost:3001",
  scope: "openid profile email",
  loginRedirectUri: "http://localhost:3001/login",
});

app.use(oidc.router);
app.use(express.static(__dirname + "/build"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/build/index.html")
});

app.get("/login", oidc.ensureAuthenticated(), (req, res) => {
    if (req.userContext && req.userContext.userinfo) {
        user = {
            email: req.userContext.userinfo.email,
            first_name: req.userContext.userinfo.given_name,
            last_name: req.userContext.userinfo.family_name
        }
        const token = jwt.sign(user, METABASE_SECRET_KEY);
        const metabaseUrl = `${METABASE_SITE_URL}/auth/sso?jwt=${token}&return_to=${encodeURIComponent(METABASE_SITE_URL)}`;
        res.redirect(metabaseUrl);
    }
});

oidc.on("ready", () => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/auth`);
  });
});

oidc.on("error", (err) => {
  console.error("Unable to configure OIDC", err);
});
