import * as express from "express";
import {Application} from "express";
import bodyParser = require("body-parser");
const app: Application = express();

app.use(bodyParser.json({type: "application/json"}));

const host = process.env.YOUR_HOST || "0.0.0.0";
const port = process.env.PORT || 8080;
app.listen(port, host, () => {
    console.info(`App listening on port ${port}!`);
});
