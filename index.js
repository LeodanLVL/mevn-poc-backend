require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { dbConnection } = require("./src/database/config");

const app = express();

main();

function applyMiddlewares() {
  app.use(cors());
  app.use(morgan("tiny"));
  app.use(express.static("public"));
  app.use(express.json());

  // Routes
  app.use("/api/providers", require("./src/routes/provider"));
  app.use("/api/clients", require("./src/routes/client"));
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server runnig on port: ${process.env.PORT || 4000}`);
  });
}

async function main(params) {
  try {
    applyMiddlewares();
    //Conectar la DB
    await dbConnection();
  } catch (error) {
    console.log("Error starting the server");
    console.log(error);
  }
}
