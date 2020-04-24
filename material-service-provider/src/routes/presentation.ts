import { Express } from "express";
import createFolder from "../helpers/createFolder";
import moveFile from "../helpers/moveFile";
import scrape from "../services/WebScraper/WebScraper";
import editContent from "../helpers/editContent";
import { createH5p } from "../../../h5p-server/h5p-file-creator";

const routeName = "/presentation";

export default (app: Express) => {
  app.get(routeName, async (req, res) => {
    const screens = await scrape(req.query.presentationName);
    res.send(screens);
  });

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

  app.post(`${routeName}/edit`, (req, res) => {
    try {
      const status = editContent(req);
      res.sendStatus(status ? 200 : 400);
    } catch (e) {
      res.sendStatus(400);
    }
  });

  app.get(`${routeName}/h5p`, (req, res) => {
    try {
      res.download(createH5p(req.query.presentationName));
    } catch(e) {
      res.sendStatus(400);
    }
  });
};
