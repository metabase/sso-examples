# Authenticating with SAML

This app is an example of how to authenticate Metabase using SAML.

# Running the example

Using `docker-compose` to run this example:

1. Run `./setup.sh YOUR_METABASE_ENTERPRISE_TOKEN` to generate a keypair to use with SAML, and a `.env` file containing your Metabase Enterprise token.
2. Run `docker-compose up`
3. Open `https://localhost:3000/` (Metabase itself) and finish setting up the Metabase instance.
4. In a different browser or incognito window, try logging into Metabase at `https://localhost:3000/`.
