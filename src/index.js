import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

import routes from "./routes";
routes(app);

app.get("/", (req, res) => res.send("Server is alive and flying!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
