import express from "express";
import booking from "./booking/index.js";
import config from "./config.js";
import gallery from "./gallery/index.js";
import _package from "./package/index.js";
import review from "./review/index.js";
import user from "./user/index.js";
import vendor from "./vendor/index.js";

const route = express.Router();

route.use(user.config.ENDPOINT, user.route);
route.use(vendor.config.ENDPOINT, vendor.route);
route.use(booking.config.ENDPOINT, booking.route);
route.use(_package.config.ENDPOINT, _package.route);
route.use(review.config.ENDPOINT, review.route);
route.use(gallery.config.ENDPOINT, gallery.route);

const apiConfig = {
  config,
  route,
  user,
  vendor,
  booking,
  _package,
  gallery,
};

export default apiConfig;
