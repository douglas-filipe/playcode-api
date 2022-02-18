const multer = require("multer");
import { Request } from "express";

export const multerVideo = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req: Request, file: any, cb: any) => {
    const isAccepted = ["video/mp4", "video/avi", "video/wmv"].find(
      (acceptedFormat) => acceptedFormat == file.mimetype
    );
    if (isAccepted) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
