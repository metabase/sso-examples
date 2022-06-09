# Embedding the Entire Metabase Application in your application

This app is an example of how to embed the Metabase application into your own application.

# Running the example

The easiest way to run the example is using Docker and `docker-compose`:

1. Enter the key you received from metabase in the `MB_PREMIUM_EMBEDDING_TOKEN` environment variable in the docker-compose.yml
2. Run `docker-compose up`
3. Open `https://localhost:3000/` (Metabase itself), you can use `a@b.com` as the user and `metabot1` as the password
4. Open `https://localhost:8080/` (the demo application)