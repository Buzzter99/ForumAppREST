const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const constants = require("../constants");
const JWT_SECRET = process.env.JWT_SECRET || constants.JWT_SECRET;
const apiKey = process.env.API_KEY || constants.API_KEY;
const {ApiResponse} = require('../models/ApiResponse');
async function authenticationMiddleware(req, res, next) {
  const requestApiKey = req.header("X-API-KEY");
    if (!requestApiKey) {
        return res.status(200).json(new ApiResponse(401,"API Key is missing."));
    }
    if (apiKey !== requestApiKey) {
        return res.status(200).json(new ApiResponse(403,"Invalid API Key."));
    }
  const token = req.cookies ? req.cookies[constants.COOKIE_NAME] : null;
  if (!token) {
    return next();
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    res.clearCookie(constants.COOKIE_NAME);
    return next();
  }
  req.user = payload;
  res.locals.user = payload;
  return next();
}
async function privateEndpoint(req, res, next) {
  const isLoggedIn = req.user;
  if (!isLoggedIn) {
    return res.status(200).json(new ApiResponse(401,"Authentication credentials are missing or invalid."));
  }
  return next();
}
module.exports = { authenticationMiddleware, privateEndpoint };
