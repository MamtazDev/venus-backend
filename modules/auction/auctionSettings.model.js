import mongoose from "mongoose";

const auctionSettingsSchema = new mongoose.Schema(
  {
    leagueName: {
      type: String,
      required: true,
    },
    leagueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      required: true,
    },

    auctionTime: {
      type: Number,
      default: 15,
      required: false,
    },
    minimumBid: {
      type: Number,
      required: false,
      default: 1,
    },
    minimumBuyin: {
      type: Number,
      required: false,
      default: 5,
    },
    maximumBuyin: {
      type: Number,
    },
    allowUnslodTeams: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AuctionSettings = mongoose.model(
  "AuctionSettings",
  auctionSettingsSchema
);

export default AuctionSettings;
