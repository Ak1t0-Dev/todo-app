import { Request, Response } from "express";
import Tags from "../models/tags";

export const getTags = async (req: Request, res: Response) => {
  const tagsList = await Tags.find();
  res.json(tagsList);
};
