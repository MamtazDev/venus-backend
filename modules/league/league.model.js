import mongoose from "mongoose";

const leagueSchema = new mongoose.Schema(
  {
    leagueName: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      required: false,
    },
    eventScope: {
      type: String,
      required: false,
    },
    inviteCode: {
      type: String,
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
  },
  {
    timestamps: true,
  }
);

const League = mongoose.model("League", leagueSchema);

export default League;
