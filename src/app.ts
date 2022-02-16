import express from "express";
import { logger } from "./middlewares";
import usersRoute from "./routes/UsersRoute";
import videoRoute from "./routes/VideoRoutes";

// import swaggerUiExpress from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";

const app = express();

//middlewares
app.use(express.json());
app.use(logger);

// app.use("/", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

//routers
usersRoute(app);
videoRoute(app);

export default app;
