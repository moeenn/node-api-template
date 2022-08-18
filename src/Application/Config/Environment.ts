export default {
  file: ".env.local",
  load_in_production: false,
  required: [
    "SERVER_HOST",
    "SERVER_PORT",
    "MONGO_HOST",
    "MONGO_PORT",
    "MONGO_DATABASE",
    "MONGO_USERNAME",
    "MONGO_PASSWORD"
  ],
}