import express from "express";
import { logger } from "./middlewares";
import {
  channelRouter,
  watchRoute,
  commentsRoute,
  chatRouter,
  tagsRoute,
  docRouter,
} from "./routes";
import usersRoute from "./routes/users.routes";

import videoRoute from "./routes/video.routes";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { Chat } from "./websocket";

// import swaggerUiExpress from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";

const app = express();
const server = http.createServer(app);

//Criando servidor com socket io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
});

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(logger);
app.use(express.static("src/views/documentation/"));

// app.use("/", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

//routers

usersRoute(app);
channelRouter(app);
videoRoute(app);
watchRoute(app);
commentsRoute(app);
chatRouter(app);
tagsRoute(app);
docRouter(app);

//SocketIO sendo chamado
Chat.webSocket(app);

export { app, server, io };
