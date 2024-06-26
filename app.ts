import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import identifyRouter from "./routes/index";
import { config } from "dotenv";

const app = express();

config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/identify", identifyRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json("Only POST /identify is defined");
});

app.listen(process.env.PORT || 3500, () => {
    console.log("Server is running");
});
