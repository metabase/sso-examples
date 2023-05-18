# Embedding the Entire Metabase Application in your application

This app is an example of how to embed the Metabase application into your own application.

# Running the example

The easiest way to run the example is using Docker and `docker-compose`:

1. Update the `MB_PREMIUM_EMBEDDING_TOKEN` environment variable in the docker-compose.yml file, so it uses the Pro/Enterprise license token you have received
2. Run `docker-compose up`
3. Open `https://localhost:3000/` (Metabase itself), you can use `admin@test.test` as the user and `secretpass1` as the password
4. Open `https://localhost:8080/` (the demo application)

NOTE: don't forget to change the `MB_JWT_SHARED_SECRET` token if you're going to use Metabase in a production environment, as this token is the key that Metabase uses to generate the signed URL's
