const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
//Import user model
const userSchema = require("../models/userSchema");

//Routes
//Get all data
router.get("/", async (req, res) => {
  try {
    const users = await userSchema.find();
    res.json(users);
  } catch (err) {
    res.json({ error: err });
  }
});

//Get specific data
router.get("/:id", async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.json({ error: err });
  }
});

//Submits data
router.post("/signup", async (req, res) => {
  const schema = Joi.object().keys({
    firstname: Joi.string()
      .trim()
      .required(),
    lastname: Joi.string()
      .trim()
      .required(),
    username: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(18)
      .required()
  });

  Joi.validate(req.body, schema, async (err, result) => {
    if (err) {
      res.send("Error occured while validating data!");
      return;
    }
    result.password = await bcrypt.hash(result.password, 8);
    const user = new userSchema(result);
    try {
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (err) {
      res.json({ error: err });
    }
    return;
  });
});

//Login
router.post("/login", async (req, res) => {
  console.log("hashfhsakghksahgkesahg");

  const schema = Joi.object().keys({
    username: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(18)
      .required()
  });

  Joi.validate(req.body, schema, async (err, result) => {
    if (err) {
      res.send("Error occured while validating login data!");
      return;
    }

    try {
      const users = await userSchema.find();
      let user;
      users.forEach(val => {
        if (val.username === result.username) {
          return (user = val);
        }
      });

      //console.log(user);
      if (user == null) {
        res.send("can't find user!");
        return;
      }

      if (await bcrypt.compare(result.password, user.password)) {
        res.json(user);
        console.log(user);
        return;
      }
      //console.log(user);

      res.json("email or password not valid!");
    } catch (err) {
      res.json({ error: err });
    }
  });
});

//Delete user data by id
router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await userSchema.deleteOne({
      _id: req.params.id
    });
    res.json(removedUser);
  } catch (err) {
    res.json({ error: err });
  }
});

//Update user data by id  (name update)
router.patch("/:id", async (req, res) => {
  try {
    const updatedUser = await userSchema.updateOne(
      {
        _id: req.params.id
      },
      { $set: { name: req.body.firstname } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
