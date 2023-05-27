import { Request, Response } from "express";
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../helpers/userHelper");

interface User {
  username: string;
  password: string;
}

const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const userObject = {
      username: username,
      password: hashedPassword,
    };
    const createUser = await users.usersModel.create(userObject);
    res.json(createUser);
  } catch (error: any) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await users.usersModel.findOne({ username }).lean();
    if (!user) {
      res.json({
        error: true,
        message: "A user is not found!",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
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
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
};

module.exports = { registerUser, loginUser };
