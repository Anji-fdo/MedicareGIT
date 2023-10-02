const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1); 
});

connection.once("open", () => {
  console.log("MongoDB Connection success!");
});

//patient

const patientRouter = require("./routes/patients.js");

app.use("/Patient", patientRouter);



//test

const testRouter = require("./routes/test.js");
app.use("/Test", testRouter);


app.use((err, req, res, next) => {
  
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" }); 
});

app.listen(PORT, () => {
  
  console.log(`Server is running on port ${PORT}`);
});
