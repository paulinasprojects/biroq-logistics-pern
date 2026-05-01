import sequelize from "../config/db";
import User from "./User";
import Company from "./Company";

User.hasOne(Company, {
  foreignKey: "userId",
  as: "companies",
  onDelete: "CASCADE",
});

Company.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { User, Company };

export const syncModels = async (): Promise<void> => {
  const isDev = process.env.NODE_ENV === "development";

  await sequelize.sync({ alter: isDev });

  console.log(`Models synced (${isDev ? "alter mode": "no-force"})`);
}