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
const fileUpload = require("express-fileupload");

//routes
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
app.use(cors());

app.use([
  express.urlencoded({ extended: false }),
  express.json(),
  fileUpload({ useTempFiles: true }),
]);
// .use(fileUpload({ useTempFiles: true }))

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
