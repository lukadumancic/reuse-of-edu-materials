import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";
const app = express();
const port = 8080;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser());

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

routes(app);
