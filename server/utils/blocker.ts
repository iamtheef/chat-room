import { Request, Response, NextFunction } from "express";

const blocker = (req: Request, res: Response, next: NextFunction) => {
  let origin = req.headers.referer || req.headers.origin;
  console.log(origin);
  console.log(process.env.client);
  if (origin === process.env.client) {
    console.log("ACCEPTED");
    next();
  } else {
    console.log("REJECTED");
    res.send("FUCK OFF");
  }
};

export default blocker;
