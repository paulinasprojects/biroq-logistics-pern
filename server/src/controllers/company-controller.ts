import { NextFunction, Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../utils/response-helpers";
import { User, Company } from "../models";
import { AppError } from "../middleware/error-handler";
import { deleteCloudinaryImage } from "../utils/cloudinary-upload";

export const createCompany = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, shippingOrigin, averageMonthlyShipments, businessType } = req.body;
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      }
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const company = await Company.create({
      userId,
      averageMonthlyShipments,
      businessType,
      name,
      shippingOrigin,
      address,
    });

    sendSuccess(res, company, "Company created successfully!", 201);
  }
);

export const createCompanyImage = asyncHandler (
 async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.userId;
    const user = await User.findOne({
    where: {
      id: userId
    }
  });

  if (!user) {
    throw new AppError("No user found", 404);
  }

  if (!req.file) {
    throw new AppError("No image file provided", 400);
  }

    const company = await Company.findOne({
      where: {
        id: id,
        userId: userId,
      }
     });

     if (!company) {
      throw new AppError("Company not found", 404);
     }

     if (company.image) {
        await deleteCloudinaryImage(company.image)
     };

     company.image = req.file.path;
     await company.save();

     sendSuccess(res, { image: company.image }, "Image updated successfully")
 }
)

export const getCompanyByUserId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
     const userId = req.userId;

     const user = await User.findOne({
      where: {
        id: userId
      }
     });

     if (!user) {
      throw new AppError("User not found", 404);
     }

     const company = await Company.findOne({
      where: {
        userId: userId,
      }
     });

     if (!company) {
      throw new AppError("Company not found", 404);
     }

     sendSuccess(res, company, "Company retrieved successfully!", 200)
  }
)

export const updateCompanyById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, shippingOrigin, averageMonthlyShipments, businessType  } = req.body;
    const userId = req.userId;
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const company = await Company.findOne({
      where: {
        id: id,
        userId: userId
      }
    });

    if (!company) {
      throw new AppError("Company not found", 404);
    };

    if (name !== undefined) {
      company.name = name;
    }

    if (address !== undefined) {
      company.address = address;
    }

    if (shippingOrigin !== undefined) {
      company.shippingOrigin = shippingOrigin;
    }

    if (averageMonthlyShipments !== undefined) {
      company.averageMonthlyShipments = averageMonthlyShipments;
    }

    if (businessType !== undefined) {
      company.businessType = businessType;
    };

    const updatedCompany = await company.save();

    sendSuccess(res, updatedCompany, "Company updated successfully!")
  }
)

export const deleteCompanyById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("No user found", 404);
    }

    const company = await Company.findOne({
      where: {
        id: id,
        userId: userId
      }
    });

    if (!company) {
      throw new AppError("Company not found", 404);
    }

    await company.destroy();

    sendSuccess(res, null, "Company deleted successfully!")
  }
)