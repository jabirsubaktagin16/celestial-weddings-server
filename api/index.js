import express from "express";
import config from "./config.js";
import _package from "./package/index.js";
import user from "./user/index.js";
import vendor from './vendor/index.js';

const route = express.Router();

route.use(user.config.ENDPOINT, user.route);
route.use(vendor.config.ENDPOINT, vendor.route);
route.use(_package.config.ENDPOINT, _package.route);

const apiConfig = {
  config,
  route,
  user,
  vendor,
  _package
};

export default apiConfig;
