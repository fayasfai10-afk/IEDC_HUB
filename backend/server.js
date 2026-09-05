import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/projectRoutes.js";

import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IEDC API is running",
  });
});

app.use(
  "/api/projects",
  projectRoutes
);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `IEDC API running on http://localhost:${PORT}`
  );
});
