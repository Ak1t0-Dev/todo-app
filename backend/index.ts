const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config({ path: path.resolve(__dirname, ".", ".env") });

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.error("connected to database"));

const authenticationRoute = require("./routes/authenticationRoutes");
app.use("/api/auth", authenticationRoute);

app.listen(port, () => {
  console.log("server is running");
});
