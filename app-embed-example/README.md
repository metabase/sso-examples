# Embedding the Entire Metabase Application in your application

This app is an example of how to embed the Metabase application into your own application.

# Running the example

The easiest way to run the example is using Docker and `docker-compose`:

1. Copy `.env.example` to `.env` and update `MB_PREMIUM_EMBEDDING_TOKEN` with your own Metabase token
2. Run `docker-compose up`
3. Open `https://localhost:3000/` (Metabase itself) and finish setting up the Metabase instance
4. Open `https://localhost:3001/` (the demo application)

Alternatively you can build the application by doing `yarn && yarn build && nodemon server.js` (ensure you have nodemon package installed globally) and also configure the server.js file with the parameters of your running Metabase server (check out how to run Metabase [here](https://www.metabase.com/docs/latest/operations-guide/installing-metabase.html))