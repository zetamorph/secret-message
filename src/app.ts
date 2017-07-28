import * as bodyParser from "body-parser";
import * as config from "config";
import { EventEmitter } from "events";
import * as express from "express";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as path from "path";
import { getMessage, postMessage } from "./controllers/message.controller";

export class App extends EventEmitter {

    public express: express.Application;

    constructor() {
        super();
        this.express = express();
        this.middleware();
        this.routes();
    }

    public async run(port: number, dbURI: string): Promise<void> {
        try {
            await mongoose.connect(dbURI, { useMongoClient: true });
            if (process.env.NODE_ENV !== "test") {
              console.log(`Mongoose connected to ${dbURI}`);
            }
        } catch (error) {
            console.log(error);
        }
        this.express.listen(port, () => {
            if (process.env.NODE_ENV !== "test") {
                console.log(`App listening on port ${port}`);
            }
            this.emit("ready");
        });
    }

    private middleware(): void {
        // Logger
        if (process.env.NODE_ENV !== "test") {
            this.express.use(morgan("combined"));
        }
        // Body parser
        this.express.use(bodyParser.json());
        // Query string parser
        this.express.use(bodyParser.urlencoded({
            extended: true,
        }));
    }

    private routes(): void {
        const router = express.Router();
        router.get("/messages/:id", getMessage);
        router.post("/messages", postMessage);
        this.express.use("/", router);
    }
}
