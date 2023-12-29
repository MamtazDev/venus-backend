import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./modules/user/user.route.js";
import leagueRoutes from "./modules/league/league.route.js";

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

// DATABASE CONNECTION
connectDB();

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/league", leagueRoutes);

app.get("/", (req, res) => {
  res.send("Server is runnig");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
