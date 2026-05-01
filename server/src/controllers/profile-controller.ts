import { NextFunction, Request, Response } from "express";
import { asyncHandler, sendSucess } from "../utils/response-helpers";
import { User } from "../models";
import { AppError } from "../middleware/error-handler";

export const getProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      }
    });

    if (!user) {
      throw new AppError("User not found", 404);
    };

    sendSucess(res, user.toSafeJSON(), "Profile retrieved successfully")
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      }
    });

    if (!user) {
      throw new AppError("User not found", 404);
    };

    if (!firstName && !lastName && !email && !password) {
      throw new AppError("Please provide first name, last name, email or password to update your password", 400);
    }

    if (firstName) {
      user.firstName = firstName
    }
    
    if (lastName) {
      user.lastName = lastName
    }

    if (email) {
      user.email = email.toLowerCase().trim()
    }

    if (password) {
      user.password = password
    }

    const updatedUser = await user.save();

    sendSucess(res, updatedUser.toSafeJSON(), "Profile updated successfully.")

  }
);