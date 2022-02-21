import { Express, Router } from "express";
import { TagsController } from "../controllers";

const router = Router()

const tagsRoute = (app: Express) => {
    router.post("", TagsController.create)

    app.use("/tags", router)
}

export default tagsRoute