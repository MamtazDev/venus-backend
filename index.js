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

// users
let users = [];
let intervalId;

const addUser = (userId, leagueId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, leagueId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// messages
let messages = [];

const addMessage = (msg, leagueId, socketId) => {
  messages = messages.filter((m) => m.leagueId !== leagueId);
  messages.push({ msg, leagueId, socketId });
};
const removeMessage = (socketId) => {
  messages = messages.filter((msg) => msg.socketId !== socketId);
};

const getMessage = (leagueId) => {
  return messages.find((i) => i.leagueId === leagueId);
};

// bidinfo
let bidInfo = [];

const addBid = (leagueId, info) => {
  bidInfo = bidInfo.filter((b) => b.leagueId !== leagueId);
  bidInfo.push({ ...info, leagueId });
};

const getBidInfo = (leagueId) => {
  return bidInfo.find((b) => b.leagueId === leagueId);
};

io.on("connection", (socket) => {
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId, leagueId) => {
    console.log("userId", userId);

    addUser(userId, leagueId, socket.id);
    io.emit("getUsers", users);
  });

  //take high bid value  and set as higher bid
  socket.on("addBid", (leagueId, info) => {
    addBid(leagueId, info);

    io.emit("getBidInfo", getBidInfo(leagueId));
  });

  socket.on("message", (msg, leagueId) => {
    addMessage(msg, leagueId, socket.id);
    // io.emit("message", messages);
    io.emit("message", getMessage(leagueId));
  });

  socket.on("startTimer", (leagueId, second) => {
    let counter = second;
    clearInterval(intervalId); // Clear previous interval, if any
    intervalId = setInterval(() => {
      if (counter === 0) {
        clearInterval(intervalId); // Stop the interval when counter reaches 0
        io.sockets.emit("counter", "Auction End", getBidInfo(leagueId));
      }
      io.sockets.emit("counter", counter, null);
      counter--;
    }, 1000);
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    removeMessage(socket.id);
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
