const profToken = (req, res, next) => {
    if (req.type === "student") {
        return res.status(401).send("Not the authorized account type.");
    }
    next();
};

module.exports = {
    profToken
}