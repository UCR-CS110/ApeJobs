const jwt = require('jsonwebtoken');

const authToken = (req, res, next) =>{
  const token = req.cookies.token;

  if (!token) return res.status(400).send("Error verifying token.");

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) return res.status(403).send("Could not process token.");
    res.email = data;
    next()
  })
};

module.exports = {
  authToken
}