import { Request, Response } from "express";
import { tagsModel } from "../models/tags";

export const getTags = async (req: Request, res: Response) => {
  const tagsList = await tagsModel.find();
  res.json(tagsList);
};
