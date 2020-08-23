import { Request, Response, NextFunction } from "express";

const blocker = (req: Request, res: Response, next: NextFunction) => {
  let origin = req.headers.origin || req.headers.referer;
  console.log("BLOCKER ", origin, process.env.client);
  console.log(origin === process.env.client);
  if (origin === process.env.client) {
    next();
  } else {
    res.send("FUCK OFF");
  }
};

export default blocker;
