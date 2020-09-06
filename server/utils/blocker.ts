import { Request, Response, NextFunction } from "express";

const blocker = (req: Request, res: Response, next: NextFunction) => {
  let origin = req.headers.referer || req.headers.origin;
  console.log(origin);
  if (origin === process.env.client || !origin) {
    next();
  } else {
    res.send("FUCK OFF");
  }
};

export default blocker;
