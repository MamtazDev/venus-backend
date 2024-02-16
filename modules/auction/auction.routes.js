import express from "express";
import { isAuth } from "../../utils/middleware.js";
import {
  auctionCreated,
  getAllAuctionsByLeagueId,
  getAuctionSettings,
  updateAuctionSettings,
  setTeamOwner,
  getMyBuidInfo,
} from "./auction.controller.js";

const router = express.Router();

router.post("/create", isAuth, auctionCreated);
// router.post("/join", isAuth, joinLeague);

router.get("/settingsInfo/:id", isAuth, getAuctionSettings);
router.get("/getLeagueAuctions/:id", isAuth, getAllAuctionsByLeagueId);
router.get("/getMybidInfo", isAuth, getMyBuidInfo);
// router.get("/leagueInfo/:id", isAuth, getSingleLeagueInfo);

router.patch("/updateAuctionSettings/:id", isAuth, updateAuctionSettings);
router.patch("/setTeamOwner/:id", isAuth, setTeamOwner);

export default router;
