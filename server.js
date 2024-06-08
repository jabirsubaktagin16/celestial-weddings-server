import cors from "cors";
import { config } from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";

config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
