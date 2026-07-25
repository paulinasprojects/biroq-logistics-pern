import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute
} from 'sequelize';
import sequelize from '../config/db';
import { Company } from './Company';
import Shippment from './Shipment';

export class Warehouse extends Model<
InferAttributes<Warehouse>, InferCreationAttributes<Warehouse>> {
  declare id: CreationOptional<string>;
  declare companyId: ForeignKey<Company["id"]>;
  declare name: string;
  declare address: string;
  declare description: CreationOptional<string | null>;
  declare image: CreationOptional<string | null>;
  declare capacity: number;
  declare currentOccupancy: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare company?: NonAttribute<Company>;
  declare shipments?: NonAttribute<Shippment[]>;
}

Warehouse.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "companies",
      key: "id"
    }
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Warehouse name cannot be empty"
      },
      len: {
        args: [2, 255],
        msg: "Warehouse name must be between 2 and 255 characters"
      },
    },
  },
  address: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Address cannot be empty"
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  image: {
    type: DataTypes.STRING(1000),
    allowNull: true,
    defaultValue: null,
    validate: {
      isUrl: {
        msg: "Image must be a valid url"
      }
    }
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: "Capacity must be at least 1."
      }
    }
  },
  currentOccupancy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: {
        args: [0],
        msg: "Occupancy cannot be negative"
      }
    }
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
{
  sequelize,
  tableName: "warehouses",
  modelName: "Warehouse"
}
);

export default Warehouse;