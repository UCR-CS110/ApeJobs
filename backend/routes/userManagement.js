const express = require("express");
const server = express.Router();
const User = require("../models/userModel");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

server.get("/", (req, res) => {
  res.status(201);
  res.json("path found");
});

server.post("/auth-google", async (req, res) => {
  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience: process.env.CLIENT_ID,
  });
  const { email, name, picture } = ticket.getPayload();
  User.findOne({
    email
  },
    (err, usr) => {
      if (!usr) return res.json({ email, name, picture });
      res.json(usr);
    });
});

server.post("/register", async (req, res) => {
  const user = req.body;
  User.findOne({ email: user.email }, (err, usr) => {
    if (!err) return res.json(usr);
    User.create(user,
      (err, usr) => {
        if (err) return res.error("Error registering.");
        res.json(usr);
      })
  });
})

module.exports = server;
