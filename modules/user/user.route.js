import express from "express";
import { isAdmin, isAuth } from "../../utils/middleware.js";
import {
  deleteUser,
  getAllUsers,
  getUser,
  getloggedInUserInfo,
  loginUser,
  registerUser,
  updateUserInfo,
} from "./user.controller.js";
import upload from "../../config/multerConfig.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", isAuth, getAllUsers);
router.get("/myInfo", isAuth, getloggedInUserInfo);
router.get("/userInfo/:id", isAuth, getUser);

router.delete("/deleteUser/:id", isAdmin, deleteUser);

router.patch(
  "/updateUserInfo/:id",
  isAuth,
  upload.single("image"),
  updateUserInfo
);

export default router;
