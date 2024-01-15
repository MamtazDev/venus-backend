import express from "express";
import { isAuth } from "../../utils/middleware.js";
import {
  getAuctionSettings,
  updateAuctionSettings,
} from "./auction.controller.js";

const router = express.Router();

// router.post("/create", isAuth, createLeague);
// router.post("/join", isAuth, joinLeague);


router.get("/settingsInfo/:id", isAuth, getAuctionSettings);
// router.get("/leagueUsersData/:leagueId", isAuth, getLeagueUsersData);
// router.get("/leagueInfo/:id", isAuth, getSingleLeagueInfo);

router.patch("/updateAuctionSettings/:id", isAuth, updateAuctionSettings);

export default router;
