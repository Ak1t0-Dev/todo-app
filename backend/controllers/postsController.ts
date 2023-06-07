import { Request, Response } from "express";
import Posts from "../models/posts";
import Users from "../models/users";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { title, content, priority, categories } = req.body;
    console.log(userId, title, content, priority, categories);
    const newPost = new Posts({
      title: title,
      content: content,
      priority: priority,
      categories: categories,
    });
    const result = await newPost.save();
    console.log(result);
    await Users.findByIdAndUpdate(userId, { $push: { posts: result._id } });
    return res.json(result);
  } catch (error: any) {
    console.log(error);
    return res.json({
      error: true,
      message: error.message,
    });
  }
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
