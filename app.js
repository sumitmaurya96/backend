const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const bodyParser = require("body-parser");

//Importing Routes
const hospitalRoutes = require("./routes/hospitalAPI");
const userRoutes = require("./routes/userAPI");

//Connect to DB
const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    console.log("Connected To DB")
  );
};

//Middleware Routes
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/hospital", hospitalRoutes);
app.use("/users", userRoutes);

//Listening to the server at port 5000
app.listen(5000);
connectDB();

module.exports = connectDB;
