const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.post("/register", async (req, res) => {
  const newuser = new User({ name: req.body.name, email: req.body.email, password: req.body.password })
  try {
    const user = await newuser.save();
    res.send("user resgister sucessfully")
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password })
    if (user) {
      const { password: pw, ...otherDetails } = user;
      const { password, ...other } = otherDetails._doc;
      res.json(other);
    } else {
      res.status(400).json({ message: 'login failed' })
    }
  } catch (error) {
    res.send({ error })
  }
})

module.exports = router