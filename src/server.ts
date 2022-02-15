import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";

const PORT = process.env.PORT || 3000;
console.log("test");
createConnection()
  .then(() => {
    console.log("[app] Connect at Database");

    app.listen(PORT, () =>
      console.log(`[app] server running at http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error));
