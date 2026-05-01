import express, {Application, Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Biroq Logistics");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Api running on http://localhost:${PORT}/api`);
});

export default app;