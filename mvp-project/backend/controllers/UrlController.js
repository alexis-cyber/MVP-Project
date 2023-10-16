const Express = require('express');

const {validateUrl} = require('../utils/util');
require('dotenv').config({ path: '../.env' });
const shortid = require('shortid');
const Url = require('../models/UrlModel');


const shortenUrl = async (req, res) => {
 

  const  {origUrl}  = req.body;
  console.log(req.body)
  const base = process.env.BASE;

  const urlId = shortid.generate();
   console.log(urlId)
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
}



 const getUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.origUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
};

module.exports= {shortenUrl,getUrl}