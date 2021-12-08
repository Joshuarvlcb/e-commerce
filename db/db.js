const mongoose = require("mongoose");

const db = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("connected to db");
  } catch (err) {
    console.log(`db has a error of ${err}`);
  }
};
module.exports = db;
