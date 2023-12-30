import League from "./league.model.js";
import { v4 as uuidv4 } from "uuid";
import LeagueUser from "./leagueUser.model.js";
import mongoose from "mongoose";

export const createLeague = async (req, res) => {
  try {
    const { leagueName, event, eventScope } = req.body;
    const inviteCode = uuidv4();

    const newLeague = new League({
      leagueName,
      event,
      eventScope,
      creatorId: req.user._id,
      inviteCode,
    });

    const league = await newLeague.save();

    const joinLeague = new LeagueUser({
      league: league?._id,
      user: req.user._id,
      userName: req.user.name,
      role: "Creator",
    });
    const result = await joinLeague.save();
    res.status(200).send({
      message: "League created  successfully!",
      success: true,
      data: league,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

export const joinLeague = async (req, res) => {
  try {
    const { inviteCode } = req.query;

    const league = await League.findOne({ inviteCode });
    const isExist = await LeagueUser.findOne({ user: req.user?._id });

    if (league && !isExist) {
      const joinLeague = new LeagueUser({
        league: league?._id,
        user: req.user?._id,
        userName: req.user?.name,
        role: "Member",
      });
      const result = await joinLeague.save();

      res.status(200).send({
        message: "League joined successfully!",
        success: true,
        data: result,
      });
    } else if (league && isExist) {
      res.status(401).send({
        message: "You have already joined this league!",
        success: false,
      });
    } else {
      res.status(401).send({
        message: "There is no such league.",
        success: false,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

export const getUserLeagues = async (req, res) => {
  try {
    const userLeagues = await LeagueUser.find({
      user: req.user._id,
    }).populate("league");
    res.status(200).send(userLeagues);
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

export const getLeagueUsersData = async (req, res) => {
  try {
    const { leagueId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(leagueId)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid league ID" });
    }

    const leagueUsers = await LeagueUser.find({
      league: leagueId,
    });
    res.status(200).send(leagueUsers);
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};
export const getSingleLeagueInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const league = await League.findById(id);
    res.status(200).send(league);
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};
