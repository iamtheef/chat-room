import { Request, Response, NextFunction } from "express";

const blocker = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers);
  let origin = req.headers.referer || req.headers.origin;

  if (origin === process.env.client) {
    console.log("ACCEPTED");
    next();
  } else {
    console.log("REJECTED");
    res.send("FUCK OFF");
  }
};

export default blocker;
