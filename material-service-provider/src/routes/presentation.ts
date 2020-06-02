import { Express } from "express";
import createFolder from "../helpers/createFolder";
import moveFile from "../helpers/moveFile";
import scrape from "../services/WebScraper/WebScraper";
import editContent from "../helpers/editContent";
import { createH5p } from "../../../h5p-server/h5p-file-creator";
import getSlide from "../helpers/getSlide";
import saveSlide from "../helpers/saveSlide";

const routeName = "/presentation";

export default (app: Express) => {
  app.get(routeName, async (req, res) => {
    let fromSlide = 0;
    let toSlide = -1;
    if (req.query.fromSlide && req.query.toSlide) {
      fromSlide = req.query.fromSlide;
      toSlide = req.query.toSlide;
    }
    const screens = await scrape(
      req.query.presentationName,
      fromSlide,
      toSlide
    );
    res.send(screens);
  });

  app.get(`${routeName}/slide`, async (req, res) => {
    try {
      const slideData = await getSlide(
        req.query.presentationName,
        req.query.screenIndex
      );
      res.status(200).send(slideData);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });

  app.post(`${routeName}/slide`, async (req, res) => {
    try {
      await saveSlide(
        req.query.presentationName,
        req.query.screenIndex,
        req.body
      );
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
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
      res.download(
        createH5p(
          req.query.presentationName,
          req.query.order.split(",").map((i: string) => parseInt(i, 10))
        )
      );
    } catch (e) {
      res.sendStatus(400);
    }
  });
};
