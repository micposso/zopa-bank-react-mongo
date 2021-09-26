# ZOPA Bank React Full Stack Application

## Install dependencies

Run "npm install" from the root directory
Navigate to /front-end and run "npm install"

## Running the applications

1- DATABASE CONNECTION
Run mongoDB locally with docker on port 27017 or create a remote Mongo Atlas cluster. 

2- CONFIGURAION FILE
Create an .env file in the root directory and add:
MONGOURI variable with the "mongodb://localhost:27017" or the Mongo Atlas URL
NODE_ENV variable with development
PORT = 5000 variable

3- RUN SERVER and FRONT-END
Run "npm run dev" for the root directory to run frontend and backend same time.

The application will open on localhost:5000. 


