import mongoose from "mongoose";

const payoutSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
    leagueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      required: true,
    },
    payerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamId: {
      type: String,
      required: true,
    },
    reciverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payout = mongoose.model("Payout", payoutSchema);

export default Payout;
