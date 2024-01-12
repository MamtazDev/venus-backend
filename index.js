import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./modules/user/user.route.js";
import leagueRoutes from "./modules/league/league.route.js";
import auctionRoutes from "./modules/auction/auction.routes.js";
import publicApiRoutes from "./modules/publicApis/publicApis.routes.js";
import path from "path";
import { fileURLToPath } from "url";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/api/auction", auctionRoutes);

app.use("/public-api", publicApiRoutes);

app.use("/assets", express.static(path.join(__dirname, "/")));

app.get("/", (req, res) => {
  res.send("Server is runnig");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
