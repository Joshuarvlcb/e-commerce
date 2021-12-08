require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const db = require("./db/db");
//middleware
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const auth = require("./middleware/auth");
//routes
app
  .use([express.urlencoded({ extended: false }), express.json()])
  .get("/", (req, res) => {
    res.send("hello");
  });

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await db(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`listening at port ${port}`);
    });
  } catch (err) {
    console.log(`error in server ${err}`);
  }
};
start();
