import { Request, Response } from "express";

export const getTest = (req: Request, res: Response): void => {
  res.send("Hello World!");
};
