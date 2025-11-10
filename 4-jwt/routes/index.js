var express = require('express');
let passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Example of required auth: protect dashboard route with JWT
router.get('/restricted', passport.authenticate('jwt', {
  session: false
}), function(req, res) {
  res.json({
    success: true,
    data: {
      message: 'It worked! User id is: ' + req.user._id + ' and email is: ' + req.user.email
    }
  });
});

module.exports = router;
