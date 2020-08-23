import * as mongoose from "mongoose";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as compression from "compression";
import getCors from "./utils/getCorsOpts";
import blocker from "./utils/blocker";

require("dotenv").config();

export const PORT = process.env.PORT || 4000;
export const app = require("express")();
export const server = app.listen(PORT, () => {
  console.log("server is running on %d", PORT);
});

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

app.use(cors(getCors()));
app.use(morgan("short"));
app.use(compression());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
