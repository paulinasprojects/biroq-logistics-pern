import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute
} from "sequelize";
import sequelize from "../config/db";
import { Warehouse } from "./Warehouse";
import { PackageType, ServiceType } from "../types";

export class Shipment extends Model<
InferAttributes<Shipment>, InferCreationAttributes<Shipment>> {
  declare id: CreationOptional<string>;
  declare warehouseId: ForeignKey<Warehouse["id"]>;
  declare shipmentName: string;
  declare senderName: string;
  declare senderPhoneNumber: string;
  declare pickupAddress: string;
  declare receiverName: string;
  declare receiverPhoneNumber: string;
  declare receiverNotes: CreationOptional<string | null>;
  declare deliveryAddress: string;
  declare packageType: PackageType;
  declare packageDescription: string;
  declare packageWeight: number;
  declare packageLength: number;
  declare packageWidth: number;
  declare packageHeight: number;
  declare declaredValue: number;
  declare hasInsurance: boolean;
  declare hasCashOnDelivery: boolean;
  declare hasDangerousGoods: boolean;
  declare specialHandling: CreationOptional<string | null>;
  declare packageNotes: CreationOptional<string | null>;
  declare serviceType: ServiceType;
  declare serviceName: string;
  declare servicePrice: number;
  declare chargeableWeight: string;
  declare deliveryTimeFrame: string;
  declare hasPickUpToday: boolean;
  declare hasSaturdayDelivery: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare warehouse?: NonAttribute<Warehouse>;
}

Shipment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  warehouseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "warehouses",
      key: "id"
    }
  },
  shipmentName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Shipment name cannot be empty"
      },
      len: {
        args: [2, 255],
        msg: "Shipment name must be between 2 and 255 characters"
      }
    }
  },
  senderName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Sender name cannot be empty"
      },
      len: {
        args: [2, 255],
        msg: "Sender name must be between 2 and 255 characters"
      }
    }
  },
  senderPhoneNumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Sender phone number cannot be empty"
      }
    }
  },
  pickupAddress: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Pick up address cannot be empty"
      }
    }
  },
  receiverName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Receiver name cannot be empty"
      },
      len: {
        args: [2, 255],
        msg: "Receiver name must be between 2 and 255 characters"
      }
    }
  },
  receiverPhoneNumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Receiver phone number cannot be empty"
      }
    }
  },
  receiverNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  deliveryAddress: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Delivery address cannot be empty"
      }
    }
  },
  packageType: {
    type: DataTypes.ENUM(...Object.values(PackageType)),
    allowNull: false,
    validate: {
      isIn: {
        args :[Object.values(PackageType)],
        msg: `Package types has to be one of ${Object.values(PackageType).join(", ")}`
      }
    }
  },
  packageDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Package description cannot be empty"
      }
    }
  },
  packageWeight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: "Package weight must be at least 1kg"
      }
    },
  },
  packageLength: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: "Package length must be at least 1cm"
      }
    },
  },
  packageWidth: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: "Package width must be at least 1cm"
      }
    },
  },
  packageHeight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: "Package height must be at least 1cm"
      }
    },
  },
  declaredValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: {
        args: [0],
        msg: "Declared value canno be negative"
      }
    },
  },
  serviceType: {
  type: DataTypes.ENUM(...Object.values(ServiceType)),
  allowNull: false,
  validate: {
    isIn: {
      args: [Object.values(ServiceType)],
      msg: `Service type must be one of: ${Object.values(ServiceType).join(", ")}`,
    },
  },
},
serviceName: {
  type: DataTypes.STRING(255),
  allowNull: false,
  validate: {
    notEmpty: {
      msg: "Service name cannot be empty"
    }
  }  
},
servicePrice: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: 0,
  validate: {
    min: { args: [0], msg: "Price cannot be negative" },
  },
},
chargeableWeight: {
  type: DataTypes.STRING(255),
  allowNull: false,
  validate: {
    notEmpty: {
      msg: "Chargeable weight cannot be empty"
    }
  }
},
deliveryTimeFrame: {
  type: DataTypes.STRING(255),
  allowNull: false,
  validate: {
    notEmpty: {
      msg: "Chargeable weight cannot be empty"
    }
  }
},
hasPickUpToday: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
},
hasSaturdayDelivery: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
},
  hasInsurance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  hasCashOnDelivery: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  hasDangerousGoods: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  specialHandling: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  packageNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
{
  sequelize,
  tableName: "shipments",
  modelName: "Shipment"
})

export default Shipment;