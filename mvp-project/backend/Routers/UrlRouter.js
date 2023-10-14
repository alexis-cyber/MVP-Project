const Express = require('express');
const router = Express.Router();
const shortid = require('shortid');
const Url = require('../models/UrlModel');
const {validateUrl} = require('../utils/util');
require('dotenv').config({ path: '../.env' });


router.post('/short', async (req, res) => {
  const  origUrl  = req.body;
  console.log(req.body)
  const base = process.env.BASE;

  const urlId = shortid.generate();
  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
});

module.exports = router;
