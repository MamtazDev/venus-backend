import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./modules/user/user.route.js";
import leagueRoutes from "./modules/league/league.route.js";
import auctionRoutes from "./modules/auction/auction.routes.js";
import publicApiRoutes from "./modules/publicApis/publicApis.routes.js";
import messageRoutes from "./modules/message/message.routes.js";
import path from "path";
import { fileURLToPath } from "url";

import { Server } from "socket.io";
import { createServer } from 'node:http';



// const socketIo = require("socket.io");

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
app.use("/api/message", messageRoutes);

app.use("/public-api", publicApiRoutes);

app.use("/assets", express.static(path.join(__dirname, "/")));

app.get("/", (req, res) => {
  res.send("Server is runnig");
});



const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
  },
});

// const io = socketIo(Server, {
//   cors: {
//     origin: "https://silver-sitting-nextjs.vercel.app",
//   },
// });

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  // socket.on("addUser", (userId) => {
  //   addUser(userId, socket.id);
  //   io.emit("getUsers", users);
  // });

  // //send and get message
  // socket.on("sendMessage", ({ senderId, receiverId, text }) => {
  //   console.log("user send Message!: ", senderId, receiverId, text);

  //   const user = getUser(receiverId);
  //   io.to(user?.socketId).emit("getMessage", {
  //     senderId,
  //     text,
  //   });
  // });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// Add a basic endpoint for testing
app.get("/socket", (req, res) => {
  res.send("Socket is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
