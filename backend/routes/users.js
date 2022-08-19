const router = require("express").Router();
const {
  getUsers,
  getUserById,
  postUser,
  deleteUserById,
  patchUserById,
  putUserById,
} = require("../controller/users");

router.route("/").get(getUsers);

router.route("/:userId").get(getUserById);

router.route("/").post(postUser);

router.route("/:userId").delete(deleteUserById);

router.route("/:userId").patch(patchUserById);

router.route("/:userId").put(putUserById);

module.exports = router;
