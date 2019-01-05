# Embedding the Entire Metabase Application in your application

This app is an example of how to embed the Metabase application into your own application.

# Running the example

The easiest way to run the example is using Docker and `docker-compose`:

1. Copy `.env.example` to `.env` and update `MB_PREMIUM_EMBEDDING_TOKEN` with your own Metabase token
2. Run `docker-compose up`
3. Open `https://localhost:3000/` (Metabase itself) and finish setting up the Metabase instance
4. Open `https://localhost:3001/` (the demo application)

Alternatively you can manually run Metabase Enterprise (`java -jar metabase.jar`) and this example (`yarn dev`), but you will need to configure various settings in Metabase. See environment variables in `docker-compose.yml` for examples.
