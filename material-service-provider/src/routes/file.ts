import { Express } from "express";
import multer from "multer";
import saveFile from "../helpers/saveFile";
import path from "path";

const routeName = "/file";

const storage = multer.diskStorage({
  destination(req: any, file: any, cb: any) {
    cb(null, `${__dirname}/../tmp`);
  },
  filename(req: any, file: any, cb: any) {
    req.body.fileName = file.originalname;
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

export default (app: Express) => {
  app.get("/:image", (req, res) => {
    const imagePath = path.resolve(
      __dirname,
      "..",
      "services",
      "WebScraper",
      "screenshots",
      req.params.image
    );
    res.sendFile(imagePath);
  });

  app.post(routeName, upload.any(), (req, res) => {
    try {
      const folderName = saveFile(req);
      res.send(folderName);
    } catch (e) {
      res.sendStatus(400);
    }
  });
};
