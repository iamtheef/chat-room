import { Request, Response, NextFunction } from "express";

const blocker = (req: Request, res: Response, next: NextFunction) => {
  console.log("BLOCKER", req.headers.origin, process.env.client);
  if (req.headers.origin === process.env.client) {
    next();
  } else {
    res.send("FUCK OFF");
  }
};

export default blocker;
