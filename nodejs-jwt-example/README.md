# nodejs-jwt-example

This is an example JSON Web Token (JWT) based Single Sign-On (SSO)
application for use with Metabase. Users would login to this example
application and a JWT token would be passed to a Metabase instance and
would be used for SSO.

The typical flow of a JWT based SSO interaction with Metabase is below:

1. User attempts to view a question i.e. `http://localhost:3000/question/1`
2. The user is not logged in, so the user is redirected to `http://localhost:3000/auth/sso`
3. Retaining the original `/question/1` URI, the user is redirected to the SSO provider (this application)
4. User logs in using the basic form
5. User is redirected back to `http://localhost:3000/auth/sso` with token and the original `/question/1` URI
6. Metabase verifies the token, logs the user in then redirects the user to their original destination `/question/1`

## Prerequisites

You will need [Node.js][] and [yarn][] or [npm][] installed.

[Node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/

## Running

To start a web server on port 3535, using [yarn][]:

    yarn
    PORT=3535 yarn start

Or using [npm][]:

    npm install
    PORT=3535 npm start
