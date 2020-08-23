import { Request, Response, NextFunction } from "express";

const blocker = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.origin === process.env.REACT_APP_baseURL) {
    next();
  } else {
    res.send("FUCK OFF");
  }
};

export default blocker;
