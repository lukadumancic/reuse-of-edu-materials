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
  try {
    if (path.basename(source) === "content.json" && fs.existsSync(target)) {
      const targetRaw = fs.readFileSync(targetFile).toString();
      const sourceRaw = fs.readFileSync(source).toString();
      const contentOld = JSON.parse(targetRaw);
      const contentNew = JSON.parse(sourceRaw);
      contentOld.presentation.slides = contentOld.presentation.slides.concat(
        contentNew.presentation.slides
      );
      fs.writeFileSync(targetFile, JSON.stringify(contentOld));
    } else {
      fs.writeFileSync(targetFile, fs.readFileSync(source));
    }
  } catch (e) {
    console.log(e);
    fs.writeFileSync(targetFile, fs.readFileSync(source));
  }
}

function copyFolderRecursiveSync(source: string, target: string) {
  let files = [];

  const targetFolder = path
    .join(target, path.basename(source))
    .replace("/content", "/");
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  files = fs.readdirSync(source);
  files.forEach((file) => {
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
    req.query.presentationName
  );
  try {
    copyFolderRecursiveSync(source, target);
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
};
