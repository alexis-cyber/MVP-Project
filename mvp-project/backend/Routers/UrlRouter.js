const express = require("express");
const router = express.Router();

const { getUrl, shortenUrl } = require("../controllers/UrlController");
router.use(express.json());
router.get("/:urlId", getUrl);
router.post("/short", shortenUrl);


module.exports = router;
