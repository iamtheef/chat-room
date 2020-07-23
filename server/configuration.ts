const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
export const app = express();
dotenv.config();

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

app.use(cors({ origin: [/localhost/], credentials: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
