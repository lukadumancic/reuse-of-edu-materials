import fs from "fs";
import unzipper from "unzipper";
import { Request } from "express";
import { hash } from "./helpers";

export default (req: Request) => {
  const randomFolderName = hash(new Date() + Math.random().toString());
  fs.createReadStream(`${__dirname}/../tmp/${req.body.filename || req.body.file.path}`).pipe(
    unzipper.Extract({
      path: `${__dirname}/../tmp/unzip/${randomFolderName}`
    })
  );
  return randomFolderName;
};
