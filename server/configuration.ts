import * as mongoose from "mongoose";
import * as cors from "cors";
import * as bodyParser from "body-parser";

export const app = require("express")();
export const server = app.listen(4000, () => {
  console.log("server is up!");
});

require("dotenv").config();

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