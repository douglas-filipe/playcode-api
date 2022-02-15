import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { ICreateUsers, IerrorsYup } from "../types/validationTypes";

export const validation =
  (schema: SchemaOf<ICreateUsers>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;
    try {
      await schema.validate(resource, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (e) {
      res.status(400).json({ error: (e as IerrorsYup).errors.join(", ") });
    }
  };
