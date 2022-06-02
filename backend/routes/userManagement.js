const express = require("express");
const server = express.Router();
const User = require("../models/userModel");
const { OAuth2Client } = require("google-auth-library");
const jwt = require('jsonwebtoken');
const client = new OAuth2Client(process.env.CLIENT_ID);
const { authToken } = require("../middleware/authToken");
const generateToken = (data) => jwt.sign({ data: data }, process.env.JWT_SECRET);

server.get("/", (req, res) => {
  res.status(201);
  res.json("path found");
});

server.get("/auth-google", async (req, res) => {
  const ticket = await client.verifyIdToken({
    idToken: req.headers.authorization,
    audience: process.env.CLIENT_ID,
  });
  const { email, name, picture } = ticket.getPayload();
  User.findOne({
    email
  },
    (err, usr) => {
      if (!usr) return res.json({ email, name, picture });
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.cookie("token", generateToken(email));
      return res.json(usr);
    });
});

server.get("/user", authToken, async (req, res) => {
  User.findOne({ email: req.email.data }, (err, usr) => {
    if (!err && usr) return res.json(usr);
  });
});

server.post("/register", async (req, res) => {
  const user = req.body;
  User.findOne({ email: user.email }, (err, usr) => {
    if (!err && usr) return res.json(usr);
    User.create(user,
      (err, usrMade) => {
        if (err) return res.send("Error registering.");
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.cookie("token", generateToken(usrMade.email));
        res.json(usrMade);
      })
  });
})

module.exports = server;


