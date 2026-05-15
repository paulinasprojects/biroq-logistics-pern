import express, {Application, Request, Response} from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from "./config/db";
import { syncModels } from "./models";
import { errorHandler, notFound } from "./middleware/error-handler";
import userRoutes from "./routes/user-routes";
import profileRoutes from "./routes/profile-routes";
import companyRoutes from "./routes/company-routes";
import warehouseRoutes from "./routes/warehouse-routes";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Biroq Logistics");
});

app.use("/api/auth", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/warehouses", warehouseRoutes);

app.use(notFound);
app.use(errorHandler);

const bootstrap = async (): Promise<void> => {
  await connectDB();
  await syncModels();
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Api running on http://localhost:${PORT}/api`);
});

bootstrap();

export default app;