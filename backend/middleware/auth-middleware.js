const jwt = require('jsonwebtoken');
const database = require('../config/database');


module.exports = (req, res, next) => {
    try {
        console.log(req.cookies.jwt);
        if (req.cookies.jwt) {
        const { jwt: token } = req.cookies;
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const { id } = decodedToken;
        database.query("SELECT id FROM users WHERE id = ?",[id], (err, result) => {
            if (err) res.status(204).json(err);
            else {
            next();
            }
        });
        } else {
        res.clearCookie();
        res.status(401).json({ message: "Interdit" });
        }
    } catch (err) {
        res.clearCookie();
        console.log(err);
        res.status(401).json({ message: "Interdit" });
    }
};