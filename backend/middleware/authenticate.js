const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticate(req, res, next) {
   try {
    const token = req.cookies.token;
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id);

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();

   } catch (e) {
    return res.status(400).json({ message: 'Invalid Token' });
   }
}

module.exports = authenticate;