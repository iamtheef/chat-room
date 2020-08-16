import * as mongoose from "mongoose";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as morgan from "morgan";

export const PORT = process.env.PORT || 4000;
export const app = require("express")();
export const server = app.listen(PORT, () => {
  console.log("server is running on %d", PORT);
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

app.use(cors({ credentials: true }));
app.use(helmet());
app.use(morgan("short"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
