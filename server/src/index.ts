import express, {Application, Request, Response} from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { syncModels } from "./models";
import { errorHandler, notFound } from "./middleware/error-handler";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Biroq Logistics");
});


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