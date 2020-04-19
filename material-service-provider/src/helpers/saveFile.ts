import fs from "fs";
import unzipper from "unzipper";
import { Request } from "express";
import { hash } from "./helpers";
import { resolve } from "dns";

export default async (req: Request) => {
  const randomFolderName = hash(new Date() + Math.random().toString());
  await new Promise((resolve: () => void) => {
    fs.createReadStream(
      `${__dirname}/../tmp/${req.body.fileName || req.body.file.path}`
    )
      .pipe(
        unzipper.Extract({
          path: `${__dirname}/../tmp/unzip/${randomFolderName}`,
        })
      )
      .on("close", () => {
        resolve();
      });
  });

  return randomFolderName;
};
