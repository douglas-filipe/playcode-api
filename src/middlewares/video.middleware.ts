import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { ErrorsYup, IVideos } from "../types/IVideo";

export const videoValidation =
  (schema: SchemaOf<IVideos>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;
    try {
      await schema.validate(resource, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (e) {
      res.status(400).json({ error: (e as ErrorsYup).errors.join(", ") });
    }
  };
