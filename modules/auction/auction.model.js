import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    leagueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      required: true,
    },

    teamName: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
    },
    bidInfo: {
      type: [
        {
          _id: false,
          bidder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          amount: Number,
        },
      ],
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;
