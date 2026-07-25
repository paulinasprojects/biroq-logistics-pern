import sequelize from "../config/db";
import User from "./User";
import Company from "./Company";
import Warehouse from "./Warehouse";
import Shipment from "./Shipment";

User.hasOne(Company, {
  foreignKey: "userId",
  as: "company",
  onDelete: "CASCADE",
});

Company.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Company.hasMany(Warehouse, {
  foreignKey: "companyId",
  as: "warehouses",
  onDelete: "CASCADE"
});

Warehouse.belongsTo(Company, {
  foreignKey: "companyId",
  as: "company"
});

Warehouse.hasMany(Shipment, {
  foreignKey: "warehouseId",
  as: "shipments",
  onDelete: "CASCADE"
})

Shipment.belongsTo(Warehouse, {
  foreignKey: "warehouseId",
  as: "warehouses"
});


export { User, Company, Warehouse, Shipment };

export const syncModels = async (): Promise<void> => {
  const isDev = process.env.NODE_ENV === "development";

  await sequelize.sync({ alter: isDev });

  console.log(`Models synced (${isDev ? "alter mode": "no-force"})`);
}