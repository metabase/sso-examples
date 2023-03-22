#!/bin/sh

echo "seting up $1"
# get deps
apk add curl jq
# get the wait-until script
curl -L https://raw.githubusercontent.com/nickjj/wait-until/v0.2.0/wait-until -o /usr/local/bin/wait-until && \
chmod +x /usr/local/bin/wait-until
# run the script and everything else
wait-until "echo 'Checking if Metabase is ready' && curl -s http://$1/api/health | grep -ioE 'ok'" 60 && \
if curl -s http://$1/api/session/properties | jq -r '."setup-token"' | grep -ioE "null"; then echo 'Instance already configured, exiting (or <v43)'; else \
echo 'Setting up the instance' && \
token=$(curl -s http://$1/api/session/properties | jq -r '."setup-token"') && \
echo 'Setup token fetched, now configuring with:' && \
echo "{'token':'$token','user':{'first_name':'Admin','last_name':'Test','email':'admin@test.test','site_name':'Embedding Test','password':'secretpass1','password_confirm':'secretpass1'},'database':null,'invite':null,'prefs':{'site_name':'Embedding Test','site_locale':'en','allow_tracking':'false'}}" > file.json && \
sed 's/'\''/\"/g' file.json > file2.json && \
cat file2.json && \
sessionToken=$(curl -s http://$1/api/setup -H 'Content-Type: application/json' --data-binary @file2.json | jq -r '.id') && echo ' < Admin session token, exiting';fi