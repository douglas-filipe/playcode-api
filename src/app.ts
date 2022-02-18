import express from "express";
import { logger } from "./middlewares";
import { channelRouter, watchRoute } from "./routes";
import usersRoute from "./routes/users.routes";
import videoRoute from "./routes/video.routes";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

// import swaggerUiExpress from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user connected: ", socket.id);
  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

app.get("/", (req, res) => {
  res.send("Running");
});

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(logger);

// app.use("/", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

//routers

usersRoute(app);
channelRouter(app);
videoRoute(app);
watchRoute(app);

export { app, server, io };
