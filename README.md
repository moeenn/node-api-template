# node-template: Node API Backend
A Typescript environment with following tools already setup
- Typescript compiler i.e. ```tsc```
- Absolute imports with `module-alias`
- ```eslint``` for static analysis and linting
- ```vitest``` for testing
- Some basic ```package.json``` scripts
- Git pre-commit hooks with `husky`

## Setup
```bash
$ npm i --save-dev
```

## Run in Development Mode
```bash
$ npm run dev
```

## Run in Production Mode
```bash
$ npm run build
$ npm run start
```
*Note*: The `NODE_ENV` environment variable will be set to `production` when running the app in production mode.

## Linting with ESLint
```bash
$ npm run lint
```

## Running Tests with Vitest
```bash
$ npm run test
```

## Setting up MongoDB
The project has already been configured to run MongoDB inside a docker container. An instance of MongoDB can be started using the following command
```bash
$ docker-compose up --build
```

*Note*: The `.env.example` file has already been configured to use the instance of MongoDB running inside this docker instance.

## Setting Up Environment
The project has been configured to use `.env.local` file in local development. This file can be configured in `src/Application/Config/EnvironmentConfig.ts`