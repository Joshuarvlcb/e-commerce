require("dotenv").config();
require("express-async-errors");
const cors = require("cors");

const express = require("express");
const app = express();
const db = require("./db/db");
//middleware
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const auth = require("./middleware/auth");
//routes
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
app.use(cors());

app.use([express.urlencoded({ extended: false }), express.json()]);

app.use("/api/v1", productRoutes);
app.use("/api/v1", cartRoutes).use(notFound);

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
