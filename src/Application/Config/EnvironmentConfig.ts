export const EnvironmentConfig = {
  file: ".env.local",
  load_in_production: false,
  required: [
    "WEBSITE_NAME",
    "FRONTEND_URL",
    "SERVER_PORT",
    "MONGO_HOST",
    "MONGO_PORT",
    "MONGO_DATABASE",
    "MONGO_USERNAME",
    "MONGO_PASSWORD",
    "AWS_ACCESS_KEY_ID",
    "AWS_ACCESS_SECRET",
    "AWS_REGION",
    "SES_FROM_EMAIL",
    "S3_BUCKET_NAME",
  ],
}