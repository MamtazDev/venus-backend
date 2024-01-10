import axios from "axios";

const AXIOS = axios.create({
  baseURL: `${process.env.PUBLIC_API_URL}`,
});

export default AXIOS;
