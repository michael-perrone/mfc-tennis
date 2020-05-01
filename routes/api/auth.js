const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");


router.post("/login", async (req, res) => {
  let userLoggingIn = await User.findOne({ userName: req.body.userName.toLowerCase() });
  if (userLoggingIn) {
    const passwordsMatching = await bcrypt.compare(
      req.body.password,
      userLoggingIn.password
    );
    if (!passwordsMatching) {
      return res
        .status(401)
        .json({ error: "Email/Password Combination not recognized" });
    } else {
      const payload = {
        user: {
          admin: userLoggingIn.admin,
          fullName: userLoggingIn.fullName,
          id: userLoggingIn.id
        }
      };

      jwt.sign(
        payload,
        config.get("userSecret"),
        { expiresIn: 36000000000000000000000000000000000000000000000 },
        (error, token) => {
          if (error) {
            throw error;
          } else {
            res.status(200).json({ token });
          }
        }
      );
    }
  }
});

module.exports = router;
