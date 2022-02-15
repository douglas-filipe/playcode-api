import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { createConnection } from "typeorm";

const PORT = process.env.PORT || 3000;
createConnection()
  .then(() => {
    console.log("[app] Connect at Database");
    
    app.listen(PORT, () =>
      console.log(`[app] server running at http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error));
