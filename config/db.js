const mongoose = require("mongoose");

const connectDb = async (url) => {
  return await mongoose.connect(url);
};

module.exports = connectDb;
