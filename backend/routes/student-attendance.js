const {
  getAttendanceStatus,
  getAttendance,
} = require("../controller/student-attendance");

const router = require("express").Router();

router.route("/status").get(getAttendanceStatus);

router.route("/:id").get(getAttendance);

module.exports = router;
