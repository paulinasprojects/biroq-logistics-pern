import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { generateToken } from "../utils/token-helpers";
import { asyncHandler, sendSuccess } from "../utils/response-helpers";
import { AppError } from "../middleware/error-handler";
import { deleteCloudinaryImage } from "../utils/cloudinary-upload";

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

    sendSuccess(res, user.toSafeJSON(), "User registered successfully!", 201)
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

    sendSuccess(res, authResponse, "Logged in successfully", 200);
  }
)

export const uploadUserImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!req.file) {
      throw new AppError("No image file provided", 400)
    }

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    if (user.image) {
      await deleteCloudinaryImage(user.image)
    }

    user.image = req.file.path;
    await user.save();

    sendSuccess(res, {image: user.image}, "Image updated successfully")
  }
)

export const deleteUserImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });


    if (!user) {
      throw new AppError("User not found", 404)
    }

    if (!user.image) {
      throw new AppError("The user doesn't have an image to delete", 404)
    }

    await deleteCloudinaryImage(user.image);

    user.image = null;
    await user.save();

    sendSuccess(res, null, "Image deleted successfully")
  }
)