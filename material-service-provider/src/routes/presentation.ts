import { Express } from "express";
import createFolder from "../helpers/createFolder";
import moveFile from "../helpers/moveFile";

const routeName = "/presentation";

export default (app: Express) => {
  app.post(routeName, (req, res) => {
    try {
      const dir = createFolder();
      res.send(dir);
    } catch (e) {
      res.sendStatus(400);
    }
  });
  app.post(`${routeName}/file`, (req, res) => {
    try {
      const isMoved = moveFile(req);
      res.sendStatus(isMoved ? 200 : 400);
    } catch (e) {
      res.sendStatus(400);
    }
  });
};
