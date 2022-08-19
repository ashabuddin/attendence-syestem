const {
  getEnable,
  getDisable,
  getStatus,
} = require("../controller/admin-attendance");

const router = require("express").Router();

router.route("/enable").get(getEnable);

router.route("/disable").get(getDisable);

router.route("/status").get(getStatus);

module.exports = router;
