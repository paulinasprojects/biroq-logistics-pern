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
import { User } from "./User";
import { BusinessType, ShippingOrigin } from '../types';


export class Company extends Model<InferAttributes<Company>,
InferCreationAttributes<Company>> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<User["id"]>;
  declare name: string;
  declare address: CreationOptional<string | null>;
  declare businessType: BusinessType
  declare averageMonthlyShipments: number;
  declare shippingOrigin: ShippingOrigin;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare user?: NonAttribute<User>;
}

Company.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    }
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
  },
  businessType: {
    type: DataTypes.ENUM(...Object.values(BusinessType)),
    allowNull: false,
    validate: {
      isIn: {
        args: [Object.values(BusinessType)],
        msg: `Business type has to be one of: ${Object.values(BusinessType).join(" ")}`
      }
    }
  },
  averageMonthlyShipments: {
    type: DataTypes.INTEGER(),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: {
        args: [1],
        msg: "Average Monthly Shipments must be greated than 0.",
      },
      max: {
        args: [1000000],
        msg: "Average Monthly Shipments must not exceed 1000000",
      }
    }
  },
  shippingOrigin: {
    type: DataTypes.ENUM(...Object.values(ShippingOrigin)),
     allowNull: false,
    validate: {
      isIn: {
        args: [Object.values(ShippingOrigin)],
        msg: `Shipping origin has to be one of: ${Object.values(ShippingOrigin).join(" ")}`
      }
    }
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
{
  sequelize,
  tableName: "companies",
  modelName: "Company"
}
)

export default Company;