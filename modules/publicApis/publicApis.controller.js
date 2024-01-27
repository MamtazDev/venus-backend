import axios from "axios";

export const getAvailableLeagues = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.PUBLIC_API_URL}/v3/football/leagues?api_token=${process.env.PUBLIC_API_TOKEN}`
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
    const response = await axios.get(
      `${process.env.PUBLIC_API_URL}/v3/football/seasons?api_token=${process.env.PUBLIC_API_TOKEN}`
    );

    const seasons = response?.data?.data?.filter(
      (i) => i.league_id === Number(req.params.id)
    );
    res.status(200).send(seasons);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getTeamBySeasonId = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.PUBLIC_API_URL}/v3/football/teams/seasons/${req.params.id}?api_token=${process.env.PUBLIC_API_TOKEN}`
    );
    
    res.status(200).send(response?.data?.data);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
