import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connect, connection } from "mongoose";
import RouteInitializer from "./RouteInitializer";
import routes from "./src/router";
import "express-async-errors";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

process.on("SIGINT", async () => {
  await connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  // Initialize DB
  (async () => {
    try {
      console.log("DB is connecting...");
      await connect("mongodb://127.0.0.1:27017");
      console.log("DB connected.");
      // All routes are initialized here.
      const myRoutes = new RouteInitializer(app, routes);
      myRoutes.initializeRoutes();
    } catch (error) {
      console.error(error);
      console.log("DB cannot be connected");
      app.all("*", (req: Request, res: Response) => {
        res.status(500).send({
          message: "An unknown error has been occurred."
        });
      });
    }
  })();
})