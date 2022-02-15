import express from "express";
import { logger } from "./middlewares";
import { channelRouter } from "./routes";
// import swaggerUiExpress from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";

const app = express();

//middlewares
app.use(express.json());
app.use(logger);
// app.use("/", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

//routers
channelRouter(app);

export default app;
