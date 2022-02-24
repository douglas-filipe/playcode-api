import { Router, Express, Request, Response } from "express";
import path from "path";

const router = Router();

const docRouter = (app: Express) => {
  router.get("", (req: Request, res: Response) => {
    const doc = path.resolve("src/views/documentation/index.html");
    console.log("*".repeat(5), doc);
    return res.sendFile(doc);
  });

  app.use("/", router);
};

export default docRouter;
