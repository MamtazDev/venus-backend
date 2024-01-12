import express from "express";
import {
  getAvailableLeagues,
  getSeasonsByLeagueId,
  getTeamBySeasonId,
} from "./publicApis.controller.js";

const router = express.Router();

// router.post("/create", isAuth, createLeague);
// router.post("/join", isAuth, joinLeague);

// router.post("/login", loginUser);

router.get("/all-leagues", getAvailableLeagues);
router.get("/all-seasons/:id", getSeasonsByLeagueId);
router.get("/all-teams/:id", getTeamBySeasonId);

// router.get("/")
// router.get("/myInfo", isAuth, getloggedInUserInfo);
// router.get("/userInfo/:id", isAuth, getUser);

// router.delete("/deleteUser/:id", isAdmin, deleteUser);

// router.patch("/updateUserInfo/:id", isAuth, updateUserInfo);

export default router;
