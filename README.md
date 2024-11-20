## Requirements

- Node.js and NPM/Yarn for running the app locally.
  If you are using NVM you can install a compatible version from the `.nvmrc` file using `nvm use`
- Docker for running the app via Docker
- docker-compose for running the app via docker-compose

## How to run it locally

To run it locally:

1. Start the container using `npm run dev`
2. The app will be available on http://localhost:5174

## How to run it using docker-compose

To run it using docker-compose:

1. Ensure you have Docker and docker-compose installed on your system
2. Start the app using `docker compose up`
3. The app will be available on: http://localhost:3000

## How to run test

To run the test:

1. Install the development dependencies using `npm install`
2. Run `docker compose up`
3. Run `npm run test`

## How to run linting

To run the linting:

1. Install the development dependencies using `npm install`
2. Run `npm run lint`

## How to run formatting

To run the formatting:

1. Install the development dependencies using `npm install`
2. Run `npm run format`
