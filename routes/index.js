var express = require('express');
var router = express.Router();
var deepai = require('deepai');
var apiKey = "b76f530f-c2c9-48d7-ba6f-003381edff54";
deepai.setApiKey(apiKey);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload', function(req, res, next) {
  console.log('req: ', req.param('file_url'));

  
  deepai.callStandardApi("nsfw-detector", {
    image: req.param('file_url'),
  }).then(function(resp) {

    console.log('api response', resp);
    res.status(200).send(resp);
  }).catch(function(err) {
    res.status(400).send(err);
  });

});



module.exports = router;
