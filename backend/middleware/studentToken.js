const studentToken = (req, res, next) => {
    if (req.type === "professor") {
        return res.status(401).send("Not the authorized account type.");
    }
    next();
};

module.exports = {
    studentToken
}