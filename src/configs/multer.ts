const multer = require("multer");
import { Request } from "express";

module.exports = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req: Request, file: any, cb: any) => {
    const isAccepted = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "video/mp4",
      "video/avi",
      "video/wmv",
    ].find((acceptedFormat) => acceptedFormat == file.mimetype);
    if (isAccepted) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
