import { Request, Response } from "express";
import { categoriesModel } from "../models/categories";

export const getCategories = async (req: Request, res: Response) => {
  // const categoriesList = await categoriesModel.find().populate("posts");
  const categoriesList = await categoriesModel.find();
  res.json(categoriesList);
};
