import { Request, Response } from "express";
import Posts from "../models/posts";

export const postPosts = async (req: Request, res: Response) => {
  try {
    const newPost = new Posts({
      title: req.body.title,
      content: req.body.content,
      priority: req.body.priority,
      categories: req.body.categories,
    });
    const result = await newPost.save();
    return res.json(result);
  } catch (error: any) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

export const creatPost = async (req: Request, res: Response) => {
  const postsList = await Posts.find().populate("tags").populate("categories");
  return res.json(postsList);
};

export const getIndividualPosts = async (req: Request, res: Response) => {
  const individualPosts = await Posts.findById(req.params.id).populate(
    "categories"
  );
  return res.json(individualPosts);
};

export const getPostedBy = async (req: Request, res: Response) => {
  const postedBy = await Posts.find().populate("tags").populate("categories");
  return res.json(postedBy);
};
