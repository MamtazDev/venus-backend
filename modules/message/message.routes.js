import express from "express";
import { isAuth } from "../../utils/middleware.js";
import { addMessage, getLeagueMessages } from "./message.controller.js";

const router = express.Router();

router.post("/add", isAuth, addMessage);

router.get("/getLeagueMessages/:id", isAuth, getLeagueMessages);

export default router;
