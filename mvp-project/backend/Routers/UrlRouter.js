const express = require('express');
const router = express.Router();


const {getUrl,shortenUrl} = require ("../controllers/UrlController")

router.get('/:urlId',getUrl)
router.post('/short',shortenUrl );

module.exports = router
