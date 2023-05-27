import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import hashPassword from "../helpers/useHelper";
import { usersModel } from "../models/users";
import dotenv from "dotenv";
dotenv.config();

interface User {
  username: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const userObject = {
      username: username,
      password: hashedPassword,
    };
    const createUser = await usersModel.create(userObject);
    res.json(createUser);
  } catch (error: any) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await usersModel.findOne({ username }).lean();
    if (!user) {
      res.json({
        error: true,
        message: "A user is not found!",
      });
    } else if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken(user);
      res.json({ accessToken: accessToken });
    }

    res.json({ error: true, message: "Invalid credentials!" });
  } catch (error: any) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};

const generateAccessToken = (user: User) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "2h" });
};
