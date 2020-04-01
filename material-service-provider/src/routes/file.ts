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
    const filename = file.originalname || Math.random().toString()
    req.body.fileName = filename;
    cb(null, filename);
  }
});

const upload = multer({ storage });

export default (app: Express) => {
  app.get(routeName + "/:image", (req, res) => {
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
