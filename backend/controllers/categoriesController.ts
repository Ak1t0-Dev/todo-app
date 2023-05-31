import { Request, Response } from "express";
import Categories from "../models/categories";

export const getCategories = async (req: Request, res: Response) => {
  // const categoriesList = await categoriesModel.find().populate("posts");
  const categoriesList = await Categories.find();
  res.json(categoriesList);
};
