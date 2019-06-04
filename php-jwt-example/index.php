<?php

# Require composer autoload
require_once('vendor/autoload.php');

# Load JWT namespace - this example uses fproject/php-jwt, but you can use your preferred provider
use \Firebase\JWT\JWT;

# Metabase settings
$metabase_url = 'https://your-metabase-install.com';
$shared_secret = 'YOUR-JWT-SHARED-SECRET-HERE';

# Get user credentials from POST request
$username = trim($_POST['username']);
$password = trim($_POST['password']);

# Test user credentials... don't use this in production!!!
$credentials = array(
    "username" => "test@test.com",
    "password" => "test1234",
    "first_name" => "Freddy",
    "last_name" => "Frogmeister",
    "groups" => ['users','admin'] # Use this array to map groups in Metabase
  );


# Test to see that user credentials are correct
if ($credentials->username == $username && $credentials->password == $password){
  
  # Credentials are correct, sign JWT
  $jwt = sign_jwt($username,$groups);
  $redirect_uri = $metabase.'/auth/sso?jwt='.$jwt;
  if(isset($_GET['return_to'])) $redirect_uri .= '&return_to='.trim($_GET['return_to']); # If return_to GET param is provided, append to Metabase URL
  header('Location: '.$redirect_uri);
  
} else {
  
  # Credentials are incorrect
  echo 'Username / password pair is either incorrect or invalid.';
  
}


# JWT signing function
function sign_jwt($username,$first_name,$last_name,$groups) {
  global $shared_secret;
  
  # Set expiry time - defaults to 8 hours, adjust as per your app requirements
  $expiry = time()+28800;
  
  $token = array(
    "iss" => $_SERVER['HTTP_HOST'],
    "user" => $username,
    "first_name" => $first_name,
    "last_name" => $last_name,
    "exp" => $expiry,
    "iat" => time(),
    "groups" => $groups
  );
  
  $jwt = JWT::encode($token, $shared_secret, 'HS256');
  return $jwt;
  
}