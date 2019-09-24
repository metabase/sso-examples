#!/usr/bin/env bash

set -eu

MB_PREMIUM_EMBEDDING_TOKEN=$1

openssl req -x509 -new -newkey rsa:2048 -nodes \
  -subj '/C=US/ST=California/L=San Francisco/O=JankyCo/CN=Test Identity Provider' \
  -keyout idp-private-key.pem \
  -out idp-public-cert.pem \
  -days 7300

MB_SAML_IDENTITY_PROVIDER_CERTIFICATE=$(cat idp-public-cert.pem | sed '1d;$d' | awk '{printf "%s", $0}')

echo "HOST=localhost" > .env
echo "MB_PREMIUM_EMBEDDING_TOKEN=$MB_PREMIUM_EMBEDDING_TOKEN" >> .env
echo "MB_SAML_IDENTITY_PROVIDER_CERTIFICATE=$MB_SAML_IDENTITY_PROVIDER_CERTIFICATE" >> .env