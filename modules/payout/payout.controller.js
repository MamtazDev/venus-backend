import Auction from "../auction/auction.model.js";
import LeagueUser from "../league/leagueUser.model.js";
import Payout from "./payout.model.js";

export const addPayout = async (req, res) => {
  try {
    const { amount, description, leagueId, teamId, reciverId } = req.body;

    const price = Number(amount);

    const newPayout = new Payout({
      amount: price,
      description,
      leagueId,
      payerId: req.user?._id,
      teamId,
      reciverId,
    });
    const result = await newPayout.save();

    const info = await LeagueUser.findOneAndUpdate(
      {
        user: reciverId,
        league: leagueId,
      },
      { $inc: { currentPayout: price, netReturn: price } },
      { new: true, useFindAndModify: false }
    );
    const auctionUpdateResult = await Auction.findOneAndUpdate(
      {
        owner: reciverId,
        leagueId: leagueId,
        teamId: teamId,
      },
      { $inc: { payout: price } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).send({
      success: true,
      message: "Payout saved!",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

export const getTeamPayoutInfo = async (req, res) => {
  try {
    const { leagueId, teamId, reciverId } = req.params;

    const payouts = await Payout.find({
      leagueId: leagueId,
      teamId: teamId,
      reciverId: reciverId,
    }).populate(["leagueId", "payerId", "reciverId"]);

    res.status(200).send(payouts);
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

export const deletePayoutInfo = async (req, res) => {
  try {
    await Payout.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).send({
          message: `Successfully removed!`,
          success: true,
        });
      })
      .catch((err) => {
        res.status(401).send({
          message: err.message,
          success: false,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};
