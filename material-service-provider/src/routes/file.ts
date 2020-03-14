import { Express } from "express";
import multer from "multer";
import fs from "fs";
import unzipper from "unzipper";

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
  app.post(routeName, upload.any(), (req, res) => {
    const randomFolderName = new Date() + Math.random().toString();
    fs.createReadStream(`${__dirname}/../tmp/${req.body.fileName}`).pipe(
      unzipper.Extract({
        path: `${__dirname}/../tmp/unzip/${randomFolderName}`
      })
    );
    res.send(randomFolderName);
  });
};
