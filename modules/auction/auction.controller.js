import { removeSensitiveInfo } from "../../utils/auth.js";
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
