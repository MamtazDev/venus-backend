import { removeSensitiveInfo } from "../../utils/auth.js";
import LeagueUser from "../league/leagueUser.model.js";
import Auction from "./auction.model.js";
import AuctionSettings from "./auctionSettings.model.js";

export const getAuctionSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const settings = await AuctionSettings.findOne({ leagueId: id });
    res.status(200).send(settings);
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

export const updateAuctionSettings = async (req, res) => {
  try {
    const { ...info } = req.body;

    const isExist = await AuctionSettings.findById(req.params.id);

    if (isExist) {
      const result = await AuctionSettings.findByIdAndUpdate(
        req.params.id,
        info,
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Auction settings updated successfully",
        data: removeSensitiveInfo(result),
      });
    } else {
      res.status(401).json({
        success: false,
        message: "No league found!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

export const auctionCreated = async (req, res) => {
  try {
    const newAuction = new Auction(req.body);

    const auction = await newAuction.save();

    res.status(200).json({
      success: true,
      message: "Auction Created Successfully!",
      data: removeSensitiveInfo(auction),
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

export const getAllAuctionsByLeagueId = async (req, res) => {
  try {
    const auctions = await Auction.find({ leagueId: req.params.id })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "owner",
        select: "-createdAt -updatedAt -__v  -password",
      });
    res.status(200).send(auctions);
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

export const setTeamOwner = async (req, res) => {
  const { owner, price } = req.body;
  try {
    const result = await Auction.findByIdAndUpdate(
      req.params.id,
      { owner, price },
      {
        new: true,
      }
    ).populate({
      path: "owner",
      select: "-createdAt -updatedAt -__v  -password",
    });

    const info = await LeagueUser.updateOne(
      { user: owner },
      { $inc: { buyIn: price } }
    );
    res.status(200).json({
      success: true,
      message: "Auction status changed Successfully!",
      data: removeSensitiveInfo(result),
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
