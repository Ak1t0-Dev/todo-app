import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import hashPassword from "../helpers/useHelper";
import Users from "../models/users";
import dotenv from "dotenv";
dotenv.config();

interface User {
  username: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, firstname, lastname, address } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const userObject = {
      username: username,
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
      address: address,
    };
    const createUser = await Users.create(userObject);
    return res.json(createUser);
  } catch (error: any) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ username }).lean();
    if (!user) {
      return res.json({
        error: true,
        message: "A user is not found!",
      });
    } else if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken(user);
      return res.json({ accessToken: accessToken });
    } else {
      return res.json({ error: true, message: "Invalid credentials!" });
    }
  } catch (error: any) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

const generateAccessToken = (user: User) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "2h",
  });
};
