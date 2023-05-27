import path from "path";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authenticationRoute from "./routes/authenticationRoutes";

dotenv.config({ path: path.resolve(__dirname, ".", ".env") });

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(`${process.env.MONGO_URI}`);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.error("connected to database"));

app.use("/api/auth", authenticationRoute);

app.listen(port, () => {
  console.log("server is running");
});
