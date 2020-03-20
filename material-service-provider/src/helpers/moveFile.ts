import fs from "fs";
import path from "path";
import { Request } from "express";

function copyFileSync(source: string, target: string) {
  let targetFile = target;
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source: string, target: string) {
  let files = [];

  const targetFolder = target;
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  files = fs.readdirSync(source);
  files.forEach(file => {
    const curSource = path.join(source, file);
    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, targetFolder);
    } else {
      copyFileSync(curSource, targetFolder);
    }
  });
}

export default (req: Request) => {
  const source = path.join(
    __dirname,
    "..",
    "tmp",
    "unzip",
    req.query.fileName,
    "content"
  );
  const target = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "h5p-server",
    "presentations",
    req.query.presentationName,
    "content"
  );
  try {
    copyFolderRecursiveSync(source, target);
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
};
