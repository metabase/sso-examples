# nodejs-jwt-example

This is an example JSON Web Token (JWT) based Single Sign-On (SSO) application for use with Metabase. Users would login to this example application and a JWT token would be passed to a Metabase instance and would be used for SSO.

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

- Configure your Metabase server (needs to be Enterprise version!) with JWT authentication where the `JWT IDENTITY PROVIDER URI` is this application URL login endpoint (should be http://localhost:3535/login). 
- Replace the `METABASE_JWT_SHARED_SECRET` in the index.js with the `STRING USED BY THE JWT SIGNING KEY` that you get from the JWT authentication page in Metabase.
- Create a question in Metabase and log out

After everything is configured, run the application using [yarn][]:

    yarn
    PORT=3535 yarn start

Or using [npm][]:

    npm install
    PORT=3535 npm start

- Go to http://localhost:3000/question/1 and you will be redirected to the sign in page, where you will have to click on the `Sign in` button to use this application URL where you can use `test@metabase.com` user and `test1` password to log in.