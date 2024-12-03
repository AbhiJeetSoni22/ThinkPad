const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchUser')
const JWT_SECRET = "heyabhi";
//Route 1 : creating a new user using "/createUser"
router.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "enter password more than length 4").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // yadi koi error aata hai tab
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
        .then((user) => {
          const data = {
            user: {
              id: user.id,
            },
          };
          const authtoken = jwt.sign(data, JWT_SECRET);
          success=true
          res.json({success, authtoken });
        })
        .catch((err) => {
          console.log(err);
          res.json({
            error: "please enter a unique email",
            message: err.message,
          });
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({success, error: "Some error occured" });
    }
  }
);

//Route 2: authenticate a user using: login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can not be empty").exists(),
  ],
  async (req, res) => {
       // yadi koi error aata hai tab
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    const {email,password}= req.body;
    try{
      let user = await User.findOne({email})
      let success = true
      if(!user){
        success = false
        return res.status(400).json({success, errors: "invalid credentials"});
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success = false
        return res.status(400).json({success, errors: "invalid credentials"});
      }
      const data= {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      
      res.json({success,authtoken});
    }catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  })

// Route 3: Get loggedin User details using:"api/auth/getUser" Login requred
router.post("/getuser",fetchuser,async (req, res) => {
try {
  const userId = req.user.id;
 const user = await User.findById(userId).select("-password");
 res.send(user);
} catch (err) {
  console.error(err);
  res.status(500).send({ error: "internal server error in getUxser" });
}
})
module.exports = router;
