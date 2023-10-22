authenticate user by sending the following request:

curl -X POST \
  http://localhost:8000/login \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "your_username",
    "password": "your_password"
  }'

  then follow as instructed by the challenge guide

docker images:
luigiloiola/mongo
luigiloiola/node
