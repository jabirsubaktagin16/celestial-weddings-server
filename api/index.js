import express from "express";
import config from "./config.js";
import user from "./user/index.js";

const route = express.Router();

route.use(user.config.ENDPOINT, user.route);

const apiConfig = {
  config,
  route,
  user,
};

export default apiConfig;
