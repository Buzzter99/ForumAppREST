const router = require("express").Router();
const { ApiResponse } = require("../models/ApiResponse");
const { generateUrlByFolder } = require("../services/dropboxApiService");
router.get("/getContentUrl", async (req, res) => {
  let result;
  let file = req.query.fullPath;
  if (!file) {
    return res.status(200).json(new ApiResponse(400, "File path is missing!"));
  }
  try {
    result = await generateUrlByFolder(file);
  } catch (error) {
    return res.status(200).json(new ApiResponse(400, error.message));
  }
  res.status(200).json(new ApiResponse(200, result));
});
module.exports = router;
