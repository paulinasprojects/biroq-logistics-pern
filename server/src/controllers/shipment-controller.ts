import { NextFunction, Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../utils/response-helpers";
import { AppError } from "../middleware/error-handler";
import { Shipment, Warehouse, Company, User } from "../models";
import { Op } from "sequelize";

export const shipmentsIncludes = [
  {
    model: Warehouse,
    as: "warehouse",
    attributes: ["id", "name"]
  }
]

const getOwnedshipment = async (userId: string, shipmentId: string | string[]) => {
  const company = await Company.findOne({
    where: {
      userId
    }
  });

  if (!company) {
    throw new AppError("No company found", 404)
  }

  const warehouseIds = (
    await Warehouse.findAll({
      where: {
        companyId: company.id
      },
      attributes: ["id"]
    })
  ).map((warehouse) => warehouse.id);

  if (warehouseIds.length === 0) {
    throw new AppError("No warehouse found", 404)
  }

  const shipment = await Shipment.findOne({
    where: {
      id: shipmentId,
      warehouseId: { [Op.in]: warehouseIds }
    },
    include: shipmentsIncludes,
  });

  if (!shipment) {
    throw new AppError("Shipment not found", 404);
  }

  return { company, shipment }
};

export const getAllShipments = asyncHandler(
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
        companyId: company.id
      },
      attributes: ["id"]
    });

    if (warehouses.length === 0) {
      throw new AppError("No warehouses found", 404)
    }

    const warehouseIds = warehouses.map((w) => w.id); 

    const shipments = await Shipment.findAll({
      where: {
        warehouseId: warehouseIds
      },
      include: shipmentsIncludes,
      order: [["shipmentName", "ASC"]]
    });

    sendSuccess(res, shipments, "Shipments retrieved successfully")
  }
)

export const getShipmentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId;

    const {shipment} = await getOwnedshipment(userId, id);

    sendSuccess(res, shipment, "Shipment retrieved successfully")

  }
)

export const createShipment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const  userId  = req.userId;

    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new AppError("User not found", 404)
    }

    const {
      warehouseId,
      shipmentName,
      senderName,
      senderPhoneNumber,
      pickupAddress,
      receiverName,
      receiverPhoneNumber,
      receiverNotes,
      deliveryAddress,
      packageType,
      packageDescription,
      packageWeight,
      packageLength,
      packageWidth,
      packageHeight,
      declaredValue,
      hasInsurance,
      hasCashOnDelivery,
      hasDangerousGoods,
      specialHandling,
      packageNotes,
      serviceType,
      serviceName,
      servicePrice,
      chargeableWeight,
      deliveryTimeFrame,
      hasPickUpToday,
      hasSaturdayDelivery
    } = req.body;

    if (!warehouseId || !shipmentName || !senderName || !senderPhoneNumber || !pickupAddress || !receiverName || !receiverPhoneNumber || !deliveryAddress || !packageType || !packageDescription || !packageWeight || !packageLength || !packageWidth || !packageHeight) {
      throw new AppError("Please provide all required shipment fields", 400)
    }

    if (!serviceType || !serviceName || !servicePrice || !chargeableWeight || !deliveryTimeFrame) {
      throw new AppError("Please provide all required service type fileds", 400)
    }

    const company = await Company.findOne({
      where: {
        userId
      }
    })

     if (!company) {
        throw new AppError("Company not found", 404)
      }

      const warehouse = await Warehouse.findOne({
        where: {
          id: warehouseId,
          companyId: company.id
        }
      });

      if (!warehouse) {
        throw new AppError("Warehouse not found", 404)
      }

     const shipment = await Shipment.create({
      warehouseId,
      shipmentName,
      senderName,
      senderPhoneNumber,
      pickupAddress,
      receiverName,
      receiverPhoneNumber,
      receiverNotes: receiverNotes ?? null,
      deliveryAddress,
      packageType,
      packageDescription,
      packageWeight,
      packageLength,
      packageWidth,
      packageHeight,
      packageNotes: packageNotes ?? null,
      declaredValue,
      hasInsurance: hasInsurance ?? false,
      hasCashOnDelivery: hasCashOnDelivery ?? false,
      hasDangerousGoods: hasDangerousGoods ?? false,
      specialHandling: specialHandling ?? null,
      serviceType,
      serviceName,
      servicePrice,
      chargeableWeight,
      deliveryTimeFrame,
      hasPickUpToday: hasPickUpToday ?? false,
      hasSaturdayDelivery: hasSaturdayDelivery ?? false,
     });

     sendSuccess(res, shipment, "Shipment created successfully", 201);
  }
)

export const updateShipmentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { id } = req.params;
    const {
      shipmentName,
      senderName,
      senderPhoneNumber,
      pickupAddress,
      receiverName,
      receiverPhoneNumber,
      receiverNotes,
      deliveryAddress,
      packageType,
      packageDescription,
      packageWeight,
      packageLength,
      packageWidth,
      packageHeight,
      declaredValue,
      hasInsurance,
      hasCashOnDelivery,
      hasDangerousGoods,
      specialHandling,
      packageNotes,
      serviceType,
      serviceName,
      servicePrice,
      chargeableWeight,
      deliveryTimeFrame,
      hasPickUpToday,
      hasSaturdayDelivery
    } = req.body;

    const {shipment} = await getOwnedshipment(userId, id);

    if (shipmentName !== undefined) {
      shipment.shipmentName = shipmentName
    }

    if (senderName !== undefined) {
      shipment.senderName = senderName
    }

    if (senderPhoneNumber !== undefined) {
      shipment.senderPhoneNumber = senderPhoneNumber
    }

    if (pickupAddress != undefined) {
      shipment.pickupAddress = pickupAddress
    }

    if (receiverName !== undefined) {
      shipment.receiverName = receiverName
    }

    if (receiverPhoneNumber !== undefined) {
      shipment.receiverPhoneNumber
    }

    if (receiverNotes !== undefined) {
      shipment.receiverNotes
    }

    if (deliveryAddress !== undefined) {
      shipment.deliveryAddress
    }

    if (packageType !== undefined) {
      shipment.packageType
    }

    if (packageDescription !== undefined) {
      shipment.packageDescription
    }

    if (packageWeight !== undefined) {
      shipment.packageWeight
    }

    if (packageLength !== undefined) {
      shipment.packageLength
    }

    if (packageWidth !== undefined) {
      shipment.packageWidth
    }

    if (packageHeight !== undefined) {
      shipment.packageHeight
    }

    if (packageNotes !== undefined) {
      shipment.packageNotes
    }

    if (declaredValue !== undefined) {
      shipment.declaredValue
    }

    if (hasInsurance !== undefined) {
      shipment.hasInsurance
    }

    if (hasCashOnDelivery !== undefined) {
      shipment.hasCashOnDelivery
    }

    if (hasDangerousGoods !== undefined) {
      shipment.hasDangerousGoods
    }

    if (specialHandling !== undefined) {
      shipment.specialHandling
    }

    if (serviceType !== undefined) {
      shipment.serviceType
    }

    if (serviceName !== undefined) {
      shipment.serviceName
    }

    if (servicePrice !== undefined) {
      shipment.servicePrice
    }

    if (chargeableWeight !== undefined) {
      shipment.chargeableWeight
    }

    if (deliveryTimeFrame !== undefined) {
      shipment.deliveryTimeFrame
    }

    if (hasPickUpToday !== undefined) {
      shipment.hasPickUpToday
    }

    if (hasSaturdayDelivery !== undefined) {
      shipment.hasSaturdayDelivery
    }

    const updatedshipment = await shipment.save();

    sendSuccess(res, updatedshipment, "Shipment updated successfully");

  }
)

export const deleteShipmentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.userId;

    const { shipment } = await getOwnedshipment(userId, id);

    await shipment.destroy();

    sendSuccess(res, null, "Shipment deleted successfully");
  }
)