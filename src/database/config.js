const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL || "mongodb://127.0.0.1:27017/store"
    );
    console.log("DB Online");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dbConnection,
};
