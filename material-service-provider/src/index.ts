import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";
const app = express();
const port = 8080;

app.use(bodyParser());

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

routes(app);
