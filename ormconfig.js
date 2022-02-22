const dotenv = require("dotenv");

dotenv.config();

const config = {
  name: "default",
  type: "postgres",
  url:
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_URL
      : "postgres://admin:1234@localhost:5432/local",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  synchronize: true,
  logging: false,
  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/entities/**/*.js"]
      : ["src/entities/**/*.ts"],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/migrations/**/*.js"]
      : ["src/migrations/**/*.ts"],
  subscribers:
    process.env.NODE_ENV === "production"
      ? ["dist/subscriber/**/*.js"]
      : ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscriber",
  },
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  aws_default_region: process.env.AWS_DEFAULT_REGION,
  aws_bucket: process.env.S3_BUCKET,
};

module.exports = config;
