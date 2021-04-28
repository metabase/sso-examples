const express = require("express");
const jwt = require("jsonwebtoken");
const url = require("url");
const escapeHtml = require("escape-html");

const PORT = process.env.PORT || 3535;
const METABASE_JWT_URL = "http://localhost:3000/auth/sso";
const METABASE_JWT_SHARED_SECRET =
  "56aac251b84fb05dc4a63a254156e9ccd328f284eb415391c0ce35c01bb47d03";

// mock users
const USERS = [
  {
    email: "test@metabase.com",
    first_name: "Test",
    last_name: "User",
    password: "test1",
  },
];

// mock user lookup
const getUser = email => USERS.find(user => user.email === email);

// mock password validation
const validateUserPassword = (user, password) =>
  user && user.password === password;

const signUserToken = user =>
  jwt.sign(
    {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    },
    METABASE_JWT_SHARED_SECRET,
  );

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/login?return_to=http://localhost:3000")
})

app.get("/login", (req, res) => {
  res.send(`
    <html>
      <h1>Login</h1>
      <form method="post" action="/login">
        <label>Email</label>
        <input type="text" name="email">
        <label>Password</label>
        <input type="password" name="password">
        <input type="hidden" name="return_to" value="${escapeHtml(
          req.query.return_to,
        )}">
        <input type="submit" value="Submit">
      </form>
    </html>
  `);
});

app.post("/login", (req, res) => {
  const user = getUser(req.body.email);
  if (user && validateUserPassword(user, req.body.password)) {
    res.redirect(
      url.format({
        pathname: METABASE_JWT_URL,
        query: {
          jwt: signUserToken(user),
          return_to: req.body.return_to,
        },
      }),
    );
  } else {
    res.status(400).send("Invalid username or password");
  }
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
