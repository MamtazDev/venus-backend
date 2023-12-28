import express from "express";
import { isAuth } from "../../utils/middleware.js";

const router = express.Router();

// // READ
// router.get("/:id", verifyToken, getUser);
// router.get("/:id/friends", verifyToken, getUserFriends);

// // UPDATE
// router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

router.post("/register", isAuth);
router.post("/login", isAuth);

export default router;
