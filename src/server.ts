import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { server } from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

createConnection()
  .then(() => {
    console.log("[app] Connect at Database");
    server.listen(PORT, () =>
      console.log(`[app] server running at http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error));
