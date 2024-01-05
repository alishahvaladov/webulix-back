import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connect, connection } from "mongoose";
import RouteInitializer from "./RouteInitializer";
import routes from "./src/router";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All routes are initialized here.
const myRoutes = new RouteInitializer(app, routes);
myRoutes.initializeRoutes();

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
      if (connection.readyState === 1) {
        console.log("DB connected.");
      }
    } catch (error) {
      console.error(error);
      console.log("DB cannot be connected");
      app.all("*", (req: Request, res: Response) => {
        res.status(500).send({
          success: false,
          message: "An unknown error has been occurred."
        });
      })
    }
  })();
})