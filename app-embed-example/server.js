const express = require("express");
const jwt = require("jsonwebtoken");
const url = require("url");

const PORT = process.env.PORT || 8080;

const METABASE_URL = process.env.METABASE_URL || "http://localhost:3000";
const METABASE_JWT_SHARED_SECRET =
  process.env.METABASE_JWT_SHARED_SECRET ||
  "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

// This matches a user in the Sample Dataset
const DEMO_USER = {
  id: 8,
  email: "aracely.jenkins@gmail.com",
  first_name: "Aracely",
  last_name: "Jenkins",
};

const signUserToken = user =>
  jwt.sign(
    {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      metalbase_user_id: user.id,
      exp: Math.round(Date.now() / 1000) + 60 * 10, // 10 minute expiration
    },
    METABASE_JWT_SHARED_SECRET
  );

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/api/config", (req, res) => res.json({ METABASE_URL }));

const mods = process.env.MODS ? process.env.MODS : ''

app.get("/api/auth/metabase", (req, res) => {
  // NOTE: in a real application you would use the embedding application's session to determine which user to use here.
  // If no session exists you would need to show an error or redirect to the embedding application's login page.
  const user = DEMO_USER;
  res.redirect(
    url.format({
      pathname: `${METABASE_URL}/auth/sso`,
      query: {
        jwt: signUserToken(user),
        return_to: `${req.query.return_to}${mods}`
      }
    })
  );
});

// PRODUCTION
app.use(express.static(__dirname + "/build"));
app.get("/*", (req, res) => res.sendFile(__dirname + "/build/index.html"));

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
