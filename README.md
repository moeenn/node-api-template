# NodeJS API Template
NodeJS API back-end with the following tools already setup
- Typescript compiler i.e. ```tsc```
- Absolute imports with `module-alias`
- ```eslint``` for static analysis and linting
- ```vitest``` for testing
- Some basic ```package.json``` scripts

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

## Linting & Formatting code 
```bash
$ npm run check
```

## Running Tests with Vitest
```bash
$ npm test
```

## Generate JWT secret
```bash
$ npm run gen:secret
```

## Run database migrations
```bash
$ npm run db:migrate
```

## Run database seeders
```bash
$ npm run db:seed
```
