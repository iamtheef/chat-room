import { Request, Response, NextFunction } from "express";

const blocker = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.referer === process.env.client) {
    console.log("CAME HERE");
    next();
  } else {
    res.send("FUCK OFF");
  }
};

export default blocker;
