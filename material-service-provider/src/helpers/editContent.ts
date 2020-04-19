import fs from "fs";
import path from "path";
import { Request } from "express";

export default (req: Request) => {
  const target = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "h5p-server",
    "presentations",
    req.query.presentationName,
    "content.json"
  );
  if (fs.existsSync(target)) {
    const targetRaw = fs.readFileSync(target).toString();
    const content = JSON.parse(targetRaw);
    delete content.presentation.slides[req.query.screenIndex];
    content.presentation.slides = content.presentation.slides.filter(
      (slide: any) => !!slide
    );
    fs.writeFileSync(target, JSON.stringify(content));
    return true;
  }
  return false;
};
