import express from "express";
import { logger } from "./middlewares";
import { channelRouter, watchRoute } from "./routes";
import usersRoute from "./routes/users.routes";
import videoRoute from "./routes/video.routes";

// import swaggerUiExpress from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";

const app = express();

//middlewares
app.use(express.json());
app.use(logger);

// app.use("/", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

//routers
usersRoute(app);
channelRouter(app);
videoRoute(app);
watchRoute(app);

export default app;
