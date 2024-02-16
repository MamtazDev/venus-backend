import express from "express";
import { isAuth } from "../../utils/middleware.js";

import { addNotification } from "./notification.controller.js";

const router = express.Router();

router.post("/add", isAuth, addNotification);

// router.post("/login", loginUser);

// router.get("/userLeagues", isAuth, getUserLeagues);
// router.get("/leagueUsersData/:leagueId", isAuth, getLeagueUsersData);
// router.get("/leagueInfo/:id", isAuth, getSingleLeagueInfo);

// router.get("/")
// router.get("/myInfo", isAuth, getloggedInUserInfo);
// router.get("/userInfo/:id", isAuth, getUser);

// router.delete("/removeUserFromLeague/:id", isAuth, removeUserFromLeague);

// router.patch("/updateLeagueInfo/:id", isAuth, updateLeagueInfo);

export default router;
