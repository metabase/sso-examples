# php-jwt-example

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

You will need to run [Composer][] to retrieve fproject/php-jwt used in this example.

Run [Composer][] in the demo folder:

    composer install

[Composer]: https://getcomposer.org/

## Running

Upload the project to your PHP testing environment, and post with a username and password to the script.

If working correctly, and you provided the correct credentials, the script will encode a JWT and redirect you back to Metabase.

## Notes

This is a bare-bones example of how to get JWT SSO working with PHP and Metabase. It is most definitely not a production-ready script.

Use your best judgement to ensure that any production implementation is secure.