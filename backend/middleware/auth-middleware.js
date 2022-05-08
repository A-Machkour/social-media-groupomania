const jwt = require("jsonwebtoken");
const database = require("../config/database");

module.exports.auth = (req, res, next) => {
  try {
    console.log("req.cookie.jwt", req.cookies.jwt);
    if (req.cookies.jwt) {
      const { jwt: token } = req.cookies;
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
      const { id } = decodedToken;
      database.query(
        "SELECT id FROM users WHERE id = ?",
        [id],
        (err, result) => {
          if (err) res.status(204).json(err);
          else {
            console.log(decodedToken.id, "id");
            next();
          }
        }
      );
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

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json("no token");
      } else {
        res[0] = decodedToken;
        next();
      }
    });
  } else {
    console.log("No token");
  }
};
