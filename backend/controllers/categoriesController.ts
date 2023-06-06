import { Request, Response } from "express";
import Categories from "../models/categories";

export const getCategories = async (req: Request, res: Response) => {
  const categoriesList = await Categories.find();
  return res.json(categoriesList);
};
