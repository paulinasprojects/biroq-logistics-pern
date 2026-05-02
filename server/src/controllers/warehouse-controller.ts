import { NextFunction, Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../utils/response-helpers";
import { Company, Warehouse } from "../models";
import { AppError } from "../middleware/error-handler";

export const createWarehouse = asyncHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    const { address, name, capacity,  description, image } = req.body;
    const userId = req.userId;

    if (!name || !address || !capacity) {
     throw new AppError("name, address and capacity are required.", 400);
    }

     const company = await Company.findOne({
      where: {
        userId: userId,
      }
     });

     if (!company) {
      throw new AppError("You must create a company before adding a warehouse", 404);
     }

     // TODO: upload image to Cloudinary here and assign the returned URL to `image`


     const warehouse = await Warehouse.create({
      companyId: company.id,
      address,
      name,
      capacity,
      description: description ?? null,
      image : image ?? null,
     });

     sendSuccess(res, warehouse, "Warehouse created successfully!", 201)
  }
)

export const getWarehouseById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
     const userId = req.userId;
     const { id } = req.params;

    const company = await Company.findOne({
      where: {
        userId: userId,
      }
     });

     if (!company) {
      throw new AppError("No company found", 404);
     }

     const warehouse = await Warehouse.findOne({
      where: {
        companyId: company.id,
        id: id
      }
     })

    if (!warehouse) {
      throw new AppError("Warehouse not found", 404);
    }

    sendSuccess(res, warehouse, "Warehouse retrieved succssfully!", 200)
  }
)

export const updateWarehouseById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, name, capacity,  description, image, currentOccupancy } = req.body
    const userId = req.userId;
    const { id } = req.params;

    const company = await Company.findOne({
      where: {
        userId: userId,
      }
     });

     if (!company) {
      throw new AppError("No company found", 404);
     }

      const warehouse = await Warehouse.findOne({
      where: {
        companyId: company.id,
        id: id
      }
     });

    if (!warehouse) {
      throw new AppError("Warehouse not found", 404);
    }


     if (name !== undefined) {
        warehouse.name = name;  
     }

     if (address !== undefined) {
      warehouse.address = address;
     }

     if (capacity !== undefined) {
      warehouse.capacity = capacity;
     }

     if (description !== undefined) {
      warehouse.description = description;
     }

    // TODO: upload image to Cloudinary here and assign the returned URL to `image`

     if (image !== undefined) {
      warehouse.image = image
     }

     if (currentOccupancy !== undefined) {
      warehouse.currentOccupancy = currentOccupancy;
     };

     const updatedWarehouse = await warehouse.save();

     sendSuccess(res, updatedWarehouse, "Warehouse updated successfully!")
  }
)

export const deleteWarehouseById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { id } = req.params;

    const company = await Company.findOne({
      where: {
        userId: userId,
      }
     });

     if (!company) {
      throw new AppError("No company found", 404);
     }

     const warehouse = await Warehouse.findOne({
      where: {
        companyId: company.id,
        id: id
      }
     })

    if (!warehouse) {
      throw new AppError("Warehouse not found", 404);
    }

    await warehouse.destroy();

    sendSuccess(res, null, "Warehouse deleted successfullh")
  }
)