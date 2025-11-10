const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const MONGO_URI = 'mongodb+srv://alfonsodasilva:5RIOMdgiRIYgMP1E@clustermir.qtrppnw.mongodb.net/exemple_2_api_crud?appName=ClusterMir';

mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", routes);

    app.listen(3000, () => {
      console.log("Server has started at port 3000");
    });
  });
