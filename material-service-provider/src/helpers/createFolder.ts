import fs from "fs";
import path from "path";
import { hash } from "./helpers";

export default () => {
  const dir = hash(new Date().toISOString());
  const target = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "h5p-server",
    "presentations",
    dir
  );
  fs.mkdirSync(target);
  fs.mkdirSync(path.join(target, "content"));
  return dir;
};
