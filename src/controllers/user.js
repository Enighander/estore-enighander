const createError = require('http-errors');
const { v4: uuidv4 } = require('uuid');
const commonHelper = require('../helper/common.js');
const { findEmail, create } = require('../models/user.js');
const bcrypt = require('bcryptjs');
const authHelper = require('../helper/auth.js');
const jwt = require('jsonwebtoken')

const userController = {
  registerUser: async (req, res, next) => {
    const { username, email, password } = req.body;
    const { rowCount } = await findEmail(email);
    try {
      if (rowCount) {
        return next(createError(403, "Email is already used. Please try again"));
      }
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const data = {
        id: uuidv4(),
        username,
        email,
        passwordHash,
        role: "user",
      };
      const result = await create(data);
      commonHelper.response(res, result.rows, 201, "User Created");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while creating the account.");
    }
  },
  loginUser: async (req, res, next) => {
  try {
    const {email,password} = req.body
    const {rows : [user]} = await findEmail(email)
      if (!user) {
        return next (createError(403, "Invalid password. Please try again"))
      }
      const isValidPassword = bcrypt.compareSync(password,user.password)
      console.log(isValidPassword);

      if (!isValidPassword) {
        return next (createError(403, "Invalid email. Please try again"))
      }
      delete user.password
      const payload = {
        email: user.email,
        role : user.role
      }
      user.token = authHelper.generateToken(payload)
      user.refreshToken = authHelper.generateRefreshToken(payload)
      
      commonHelper.response(res, user, 201, 'log in successful')
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while login the account.")
  }
  },
  profileUser : async(req, res, next) => {
    const email = req.payload.email
    const {rows:[user]} = await findEmail(email)
    delete user.password
    commonHelper.response(res,user,200)
  },
  refreshToken : (req ,res, next) => {
    const refreshToken = req.body.refreshToken
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT)
    const payload = {
      email : decoded.email,
      role : decoded.role
    }
    const result = {
      token : authHelper.generateToken(payload),
      refreshToken : authHelper.generateRefreshToken(payload)
    }
    commonHelper.response(res,result,200,"Session Restored")
  }
};

module.exports = userController;
