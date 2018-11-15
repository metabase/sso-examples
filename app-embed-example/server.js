const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const url = require("url");

const PORT = process.env.PORT || 3535;

const METABASE_URL = process.env.METABASE_URL || "http://localhost:3000";
const METABASE_JWT_SHARED_SECRET =
  process.env.METABASE_JWT_SHARED_SECRET ||
  "5a0c682f97949a5b36603db70297ef9c708ca139b92415ec20bf8f5aae03fdc0";

const signUserToken = user =>
  jwt.sign(
    {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    METABASE_JWT_SHARED_SECRET,
  );

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/config", (req, res) => res.json({ METABASE_URL }));

app.get("/api/auth/metabase", (req, res) => {
  const user = {
    email: "embedtest@metabase.com",
    first_name: "Hello",
    last_name: "World",
  };
  res.redirect(
    url.format({
      pathname: `${METABASE_URL}/auth/sso`,
      query: {
        jwt: signUserToken(user),
        return_to: req.query.return_to,
      },
    }),
  );
});

// PRODUCTION
app.use(express.static(__dirname + "/build"));
app.get("/*", (req, res) => res.sendFile(__dirname + "/build/index.html"));

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
