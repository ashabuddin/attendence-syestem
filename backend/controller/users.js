const { registerService } = require("../service/auth");
const {
  findUsers,
  findUserByProperty,
  updateUser,
} = require("../service/user");
const error = require("../utils/error");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await findUserByProperty("_id", userId);

    if (!user) {
      throw error("User not found", 404);
    }
    // TODO: we have to delete the password from user object
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

exports.postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

exports.putUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, roles, accountStatus } = req.body;

  try {
    const user = await updateUser(userId, {
      name,
      email,
      roles,
      accountStatus,
    });

    if (!user) {
      throw error("User not found", 404);
    }
    await user.save()

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

exports.patchUserById = async (req, res, next) => {
  const { userId } = req.params;

  const { name, roles, accountStatus } = req.body;

  try {
    const user = await findUserByProperty("_id", userId);

    if (!user) {
      throw error("User not found", 404);
    }

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

exports.deleteUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await findUserByProperty("_id", userId);

    if (!user) {
      throw error("User not found", 404);
    }

    await user.remove();
    return res.status(203).send({ message: "User Deleted" });
  } catch (e) {
    next(e);
  }
};
