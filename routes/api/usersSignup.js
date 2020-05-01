const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");


router.post("/", async (req, res) => {
  console.log(req.body)
  let user = await User.findOne({ userName: req.body.userName.toLowerCase() });

  try {
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Username is already being used" }] });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }

  if (!user) {
;
    let newUser = new User({
      fullName: req.body.fullName,
      userName: req.body.userName,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(req.body.password, salt);

    await newUser.save();

    const payload = {
      user: {
        admin: false,
        id: newUser.id,
        fullName: req.body.userName 
      }
      
    };
    jwt.sign(
      payload,
      config.get("userSecret"),
      { expiresIn: 360000000000 },
      (error, token) => {
        if (error) {
          throw error;
        } else {
          res.status(200).json({ token });
        }
      }
    );
  }
});

module.exports = router;
