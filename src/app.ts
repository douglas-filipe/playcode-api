import express from "express";
import { logger } from "./middlewares";
import usersRoute from "./routes/UsersRoute";
import videoRoute from "./routes/VideoRoutes";

import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import S3 from "aws-sdk/clients/s3";

// import swaggerUiExpress from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";

const app = express();

//middlewares
app.use(express.json());
app.use(logger);

// app.use("/", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

// AWS
// s3.getObject({Bucket: 'bucketName', Key: 'keyName'});

// FIM AWS

//routers
usersRoute(app);
videoRoute(app);

export default app;
