import { NextFunction, Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../utils/response-helpers";
import { Company, Warehouse } from "../models";
import { AppError } from "../middleware/error-handler";
import { deleteCloudinaryImage } from "../utils/cloudinary-upload";

export const createWarehouse = asyncHandler(
  async(req: Request, res: Response, next: NextFunction) => {
    const { address, name, capacity,  description } = req.body;
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


     const warehouse = await Warehouse.create({
      companyId: company.id,
      address,
      name,
      capacity,
      description: description ?? null,
     });

     sendSuccess(res, warehouse, "Warehouse created successfully!", 201)
  }
)

export const createWarehouseImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId;

    if (!req.file) {
      throw new AppError("No image file provided", 400);
    }

    const company = await Company.findOne({
      where: {
        userId: userId
      }
    });

    if (!company) {
      throw new AppError("No company found", 404)
    }

    const warehouse = await Warehouse.findOne({
      where: {
        id,
        companyId: company.id
      }
    });

    if (!warehouse) {
      throw new AppError("Warehouse not found", 404)
    };

    if (warehouse.image) {
      await deleteCloudinaryImage(warehouse.image)
    }

    warehouse.image = req.file.path;
    await warehouse.save();

    sendSuccess(res, { image: warehouse.image }, "Image updated successfully")

});

export const deleteWarehouseImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId;
    const company = await Company.findOne({
      where: {
        userId: userId
      }
    });

    if (!company) {
      throw new AppError("No company found", 404)
    }

    const warehouse = await Warehouse.findOne({
      where: {
        id,
        companyId: company.id
      }
    });

    if (!warehouse) {
      throw new AppError("Warehouse not found", 404)
    };

    if (!warehouse.image) {
      throw new AppError("Warehouse has not image to delete", 404);
    }

    await deleteCloudinaryImage(warehouse.image);
    warehouse.image = null;
    await warehouse.save();

    sendSuccess(res, null,"Image deleted successfully")
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

export const getAllWarehouses = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;


    const company = await Company.findOne({
      where: {
        userId: userId,
      }
     });

     if (!company) {
      throw new AppError("No company found", 404);
     }

     const warehouses = await Warehouse.findAll({
      where: {
        companyId: company.id,
      },
      order: [["name", "DESC"]]
     });

      sendSuccess(res, warehouses, "Warehouses retrieved successfully.")
});

export const updateWarehouseById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address, name, capacity,  description, currentOccupancy } = req.body
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

    sendSuccess(res, null, "Warehouse deleted successfully")
  }
)
