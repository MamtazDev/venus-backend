import mongoose from "mongoose";

const leagueUserSchema = new mongoose.Schema(
  {
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Creator", "Member"],
      required: true,
    },
    buyIn: {
      type: Number,
      default: 0,
    },
    currentPayout: {
      type: Number,
      default: 0,
    },
    netReturn: {
      type: Number,
      default: 0,
    },
    numTeams: {
      type: Number,
      default: 0,
    },
    numTeamAlive: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const LeagueUser = mongoose.model("LeagueUser", leagueUserSchema);

export default LeagueUser;
