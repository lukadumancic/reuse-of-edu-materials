const fs = require("fs");
const Path = require("path");
const { execSync } = require("child_process");

function deleteFolderRecursive(path: any) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file: any) => {
      const curPath = Path.join(path, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function copyFileSync(source: any, target: any, order: number[] | null) {
  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = Path.join(target, Path.basename(source));
    }
  }

  try {
    if (order && Path.basename(source) === "content.json") {
      const sourceRaw = fs.readFileSync(source).toString();
      const contentNew = JSON.parse(sourceRaw);
      const newSlides = order.map((o) => contentNew.presentation.slides[o]);
      contentNew.presentation.slides = newSlides;
      fs.writeFileSync(source, JSON.stringify(contentNew));
    } 
  } catch (e) {
    console.log(e);
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source: any, target: any, order: number[], skip = false) {
  var files = [];

  //check if folder needs to be created or integrated
  var targetFolder = Path.join(target);

  if (!skip) {
    targetFolder = Path.join(target, Path.basename(source));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file: any) {
      var curSource = Path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder, order);
      } else {
        copyFileSync(curSource, targetFolder, order);
      }
    });
  }
}

export function createH5p(presentatioName: string, order: number[] | null) {
  console.log(order);
  try {
    fs.unlinkSync(Path.join(__dirname, "presentations", "content"));
  } catch (e) {
    console.log("No file 1");
  }
  copyFolderRecursiveSync(
    Path.join(__dirname, "presentations", presentatioName),
    Path.join(__dirname, "presentations", "content"),
    order,
    true
  );
  try {
    fs.unlinkSync(Path.join(__dirname, "tmp", "tmp.h5p"));
  } catch (e) {
    console.log("No file 2");
    console.log(Path.join(__dirname, "tmp", "tmp.h5p"));
  }
  deleteFolderRecursive("./tmp/content");
  copyFolderRecursiveSync(
    Path.join(__dirname, "presentations", "content"),
    Path.join(__dirname, "tmp"),
    null
  );
  execSync(`cd ${Path.join(__dirname, 'tmp')} && zip -r -D -X tmp.h5p *`);
  return Path.join(__dirname, "tmp", `tmp.h5p`);
}
