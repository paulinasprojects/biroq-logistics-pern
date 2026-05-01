import bcrypt from "bcryptjs";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";

export class User extends Model<InferAttributes<User>, 
InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare email: string;
  declare password: string;
  declare firstName: CreationOptional<string | null>;
  declare lastName: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  };

  toSafeJSON(): Omit<User["dataValues"], "password"> {
    const { password, ...safe } = this.toJSON() as User["dataValues"];
    return safe;
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      name: "users_email_unique",
      msg: "An account with this email already exists",
    },
    validate: {
      isEmail: {
        msg: "Must be a valid email address"
      },
      notEmpty: {
        msg: "Email cannot be empty"
      }
    }
  },
  password: {
    type: DataTypes.STRING(25),
    allowNull: false,
    validate: {
      len: {
        args: [8, 25],
        msg: "Password must be at least 8 characters long "
      }
    }
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
},
{
  sequelize,
  tableName: "users",
  modelName: "User",
  hooks: {
    beforeCreate: async (user: User) => {
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate: async (user: User) => {
      if (user.changed("password")) {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  },
})

export default User;