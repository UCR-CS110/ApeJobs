const express = require("express");
const server = express.Router();

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

server.get("/", (req,res)=>{
    res.status(201);
    res.json("path found");
});

server.post("/auth-google", async (req, res) => {
    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();
    const user = await { 
        where: { email: email },
        update: { name, picture },
        create: { name, email, picture }
    };
    //add db insert here if user is new
    res.status(201);
    res.json(user);
});


module.exports = server;