import * as path from "path";
import * as express from "express";
import apiRouter from "./routes";
var bodyParser = require('body-parser');

const app = express();


let p = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

app.use(bodyParser.json());
app.use(express.static(p));
app.use("/api", apiRouter);
