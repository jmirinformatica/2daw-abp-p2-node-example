require('dotenv').config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')

// Register new users
exports.register = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.json({
      success: false,
      message: 'Please enter email and password.'
    });
  }
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if(user) {
    return res.json({
      success: false,
      message: 'That email address already exists.'
    });
  }

  // Create a new user
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  let newUser = new User({
    email: email,
    password: hash,
    jwt_version: 0
  });

  //Save the new user
  await newUser.save();
  res.json({
    success: true,
    data: {
      email: email
    }
  });
};

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
exports.login = async (req, res, next) => {
  let email, contrasenya;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Basic ')) {
    try {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const [userEmail, userPassword] = credentials.split(':');
      email = userEmail;
      contrasenya = userPassword;
    } catch (err) {
      return res.status(400).json({ message: 'Invalid Basic auth format.' });
    }
  } else if (req.body.email && req.body.password) {        
    email = req.body.email;
    contrasenya = req.body.password;
  }

  if (!email || !contrasenya) {
    return res.json({
      success: false,
      message: 'Please enter email and password.'
    });
  }

  const user = await User.findOne({ email: email });
  if(!user) {
    return res.json({
      success: false,
      message: 'Authentication failed. User not found.'
    });
  }

  if(bcrypt.compareSync(contrasenya, user.password)){
    // Create token if the password matched and no error was thrown
    const payload = {
      user_id: user.id,
      timestamp: Date.now(),
      //you can add more data here if you want
      jwt_version: user.jwt_version
    };
    console.log('payload', payload);
    const token = jwt.sign(payload, config.auth.secret, {
      expiresIn: "2 days"
    });

    res.json({
      success: true,
      data: {
        token: token
      }
    });
  } else {
    res.send({
      success: false,
      message: 'Authentication failed. Passwords did not match.'
    });
  }
};

exports.logout = async (req, res, next) => {
  // Increment version to invalidate old token
  req.user.jwt_version = Number(req.user.jwt_version) || 0;
  req.user.jwt_version += 1;
  await req.user.save();

  res.json({
    success: true,
    data: {}
  });
};