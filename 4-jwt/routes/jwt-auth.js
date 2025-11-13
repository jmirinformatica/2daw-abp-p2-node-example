var express = require('express');
var router = express.Router();

// Controllers
const JWTAuthController = require('../controllers/jwtAuthController');

// Middlewares
const { ensureJWTAuthenticated } = require('../middlewares/jwt-auth');

// Routes
router.post('/register', JWTAuthController.register);
router.post('/login', JWTAuthController.login);
router.delete('/logout', ensureJWTAuthenticated, JWTAuthController.logout);

module.exports = router;
