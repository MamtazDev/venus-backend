import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

// DATABASE CONNECTION
connectDB();


// ROUTES
app.use("api/users",)

app.get("/", (req, res) => {
  res.send("Server is runnig");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
