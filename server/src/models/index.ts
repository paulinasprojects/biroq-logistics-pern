import sequelize from "../config/db";
import User from "./User";

export { User };

export const syncModels = async (): Promise<void> => {
  const isDev = process.env.NODE_ENV === "development";

  await sequelize.sync({ alter: isDev });

  console.log(`Models synced (${isDev ? "alter mode": "no-force"})`);
}