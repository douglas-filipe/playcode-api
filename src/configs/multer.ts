const multer = require("multer");
import { Request } from "express";

module.exports = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req: Request, file: any, cb: any) => {
    const isAccepted = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "video/mp4",
      "video/avi",
      "video/wmv",
    ].find((formatoAceito) => formatoAceito == file.mimetype);
    if (isAccepted) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
