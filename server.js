const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB connection success!");
});

const prescriptionRouter = require("./routes/prescriptions.js");

app.use("/prescription", prescriptionRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number : ${PORT}`);
});