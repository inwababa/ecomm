const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = 5001;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //optional
app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});

//Routes
app.use('/api', require('./routes/index'));

app.listen(PORT, () => {
  console.log("Server started listening on PORT : " + PORT);
});