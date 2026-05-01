import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { generateToken } from "../utils/token-helpers";
import { asyncHandler, sendSucess } from "../utils/response-helpers";
import { AppError } from "../middleware/error-handler";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      throw new AppError("Please provide a email and password", 400);
    };

    const user = await User.create({
      email: email.trim().toLowerCase(),
      password,
      firstName: firstName?.trim() ?? null,
      lastName: lastName?.trim() ?? null,
    });

    sendSucess(res, user.toSafeJSON(), "User registered successfully!", 201)
});

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Please provide a valid email or password", 400)
    }

    const user = await User.findOne({
      where: {
        email: email.toLowerCase()
      }
    });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken(user.id);

    const authResponse = {
      user: user.toSafeJSON(),
      token: token,
    }

    sendSucess(res, authResponse, "Logged in successfully", 200);
  }
)