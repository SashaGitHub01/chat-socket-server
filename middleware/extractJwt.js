const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");


module.exports = async (req, res, next) => {
   const { TOKEN } = req.cookies;

   if (!TOKEN) return next(ApiError.unauthorized());

   const { id } = jwt.decode(TOKEN);
   const user = await User.findById(id);

   if (!user) return next(ApiError.unauthorized());

   req.user = user;

   return next();
}