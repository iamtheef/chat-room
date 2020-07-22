const mongoose = require("mongoose");
const express = require("express");
export const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

export const connectDB = () => {
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(process.env.DB_, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to db"))
    .catch((e) => console.error(e));
};
