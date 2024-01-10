import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import cookieParser from "cookie-parser";
import { ExceptionHandlerMiddleware } from "./middleware/index";
import routes from "./routes";
import path from "path";
dotenv.config();

const _dirname = path.resolve();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on Domain ${process.env.DOMAIN}`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URL);
mongoose.connection.on("error", (err: Error) => {
  console.error(`DB-Error: ${err}`);
});

app.use("/api/", routes());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
  });
}

app.use(ExceptionHandlerMiddleware);
