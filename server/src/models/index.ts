import sequelize from "../config/db";

export const syncModels = async (): Promise<void> => {
  const isDev = process.env.NODE_ENV === "development";

  await sequelize.sync({ alter: isDev });

  console.log(`Models synced (${isDev ? "alter mode": "no-force"})`);
}