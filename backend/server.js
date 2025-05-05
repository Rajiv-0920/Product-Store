import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://127.0.0.1:${PORT}`);
});
