import AXIOS from "../../config/axiosInstance.js";

export const getAvailableLeagues = async (req, res) => {
  try {
    const response = await AXIOS.get(
      `/v3/football/leagues?api_token=7c0V4CPUaauLeyRb8LjqaCdLZxidiGvmUOd7P1PWTPUiasZLNzX1TRFgOMzD`
    );

    res.status(200).send(response?.data?.data);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getSeasonsByLeagueId = async (req, res) => {
  try {
    const response = await AXIOS.get(
      `/v3/football/seasons?api_token=${process.env.PUBLIC_API_TOKEN}`
    );

    const seasons = response?.data?.data?.filter(
      (i) => i.league_id === req.params.id
    );
    res.status(200).send(seasons);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}).sort({ _id: -1 }).select("-password");
//     res.status(200).send({
//       data: users,
//     });
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };
