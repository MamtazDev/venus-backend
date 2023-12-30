import express from "express";
import { isAdmin, isAuth } from "../../utils/middleware.js";
import {
  createLeague,
  getLeagueUsersData,
  getSingleLeagueInfo,
  getUserLeagues,
  joinLeague,
} from "./league.controller.js";

const router = express.Router();

router.post("/create", isAuth, createLeague);
router.post("/join", isAuth, joinLeague);

// router.post("/login", loginUser);

router.get("/userLeagues", isAuth, getUserLeagues);
router.get("/leagueUsersData/:leagueId", isAuth, getLeagueUsersData);
router.get("/leagueInfo/:id", isAuth, getSingleLeagueInfo);

// router.get("/")
// router.get("/myInfo", isAuth, getloggedInUserInfo);
// router.get("/userInfo/:id", isAuth, getUser);

// router.delete("/deleteUser/:id", isAdmin, deleteUser);

// router.patch("/updateUserInfo/:id", isAuth, updateUserInfo);

export default router;
