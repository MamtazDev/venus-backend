import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./modules/user/user.route.js";
import leagueRoutes from "./modules/league/league.route.js";
import auctionRoutes from "./modules/auction/auction.routes.js";
import publicApiRoutes from "./modules/publicApis/publicApis.routes.js";
import messageRoutes from "./modules/message/message.routes.js";
import notificationRoutes from "./modules/notification/notification.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

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
app.use("/api/notification", notificationRoutes);

app.use("/public-api", publicApiRoutes);

app.use("/assets", express.static(path.join(__dirname, "/")));

app.get("/", (req, res) => {
  res.send("Server is runnig");
});

// SOCKET
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {},
});
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
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    console.log("userId", userId);

    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //take high bid value  and set as higher bid
  socket.on("addHigherBid", (bid) => {
    console.log("Heigher bid", bid);

    // addUser(userId, socket.id);
    addHigher = bid;
    io.emit("getHigherBid", addHigher);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("user send Message!: ", senderId, receiverId, text);

    const user = getUser(receiverId);

    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// Add a basic endpoint for testing
app.get("/", (req, res) => {
  res.send("Server is running.");
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
