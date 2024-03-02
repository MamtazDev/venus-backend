import express from "express";
import {
  addPayout,
  deletePayoutInfo,
  getTeamPayoutInfo,
} from "./payout.controller.js";
import { isAuth } from "../../utils/middleware.js";

const router = express.Router();

router.post("/add", isAuth, addPayout);
router.delete("/delete/:id", isAuth, deletePayoutInfo);
router.get("/info/:leagueId/:teamId/:reciverId", isAuth, getTeamPayoutInfo);

export default router;
