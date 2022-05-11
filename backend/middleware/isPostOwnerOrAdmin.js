const jwt = require("jsonwebtoken");
const database = require("../config/database");

module.exports.isPostOwnerOrAdmin = (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const { id: postId } = req.params;
      const { jwt: token } = req.cookies;
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
      const { id } = decodedToken;
      // get user info
      database.query(
        "SELECT * FROM users WHERE id = ?",
        [id],
        (err, result) => {
          if (err) return res.status(404).json(err);
          else {
            // check if user is admin
            if (result[0].admin) {
              return next();
            }
            database.query(
              "SELECT user_id FROM posts WHERE post_id = ?",
              [postId],
              (err, result) => {
                // check if user is the owner of the post
                if (id === result[0].user_id) {
                  return next();
                }
                // if user is not the owner of the post or admin, return error
                else {
                  return res.status(401).json({ err: "Unauthorized" });
                }
              }
            );
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
