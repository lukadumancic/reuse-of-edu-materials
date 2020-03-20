import { Express } from "express";
import file from "./file";
import presentation from "./presentation";

export default (app: Express) => {
  file(app);
  presentation(app);
};
