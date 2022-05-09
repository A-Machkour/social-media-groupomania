const database = require("../config/database");

exports.getAllPosts = (req, res) => {
  database.query(
    "SELECT * FROM posts ORDER BY post_date DESC;",
    (err, result) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).send(result);
    }
  );
};
exports.getOnePost = (req, res) => {
  const id = req.params.id;
  database.query(
    "SELECT * FROM posts WHERE post_id = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).send(result);
    }
  );
};

exports.getOneImage = (req, res, next) => {
  const { id: postId } = req.params;
  const sqlGetImage = `SELECT image_url FROM images WHERE post_id = ${postId};`;
  database.query(sqlGetImage, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    // if (result[0]) {
    //   result[0].post_file =
    //     req.protocol +
    //     "://" +
    //     req.get("host") +
    //     "/images/posts/" +
    //     result[0].post_file;
    // }
    res.status(200).send(result);
  });
};

// faire les images plus tard grace a multer
// exports.createOnePost = (req, res) => {
//   const { content, user_id } = req.body;
//   const { file } = req;
//   database.query(
//     "INSERT INTO posts (content, user_id) VALUES (?, ?)",
//     [content, user_id],
//     (err, result) => {
//       if (err) {
//         res.status(404).send(err);
//       }
//       if (file) {
//         database.query(
//           "UPDATE posts SET post_file = ? WHERE post_id = ?",
//           [file, result.insertId],
//           (err, result) => {
//             if (err) {
//               res.status(404).send(err);
//             }
//             res.status(200).send(result);
//           }
//         );
//       }
//       res.status(200).send(result);
//     }
//   );
// };
// exports.createOnePost = (req, res, next) => {
//   let { body, file } = req;
//   const userId = req.params.id;
//   if (!file) {
//     delete req.body.post_image;
//     body = {
//       ...body,
//     };
//     const sqlInsert = "INSERT INTO posts SET ?";
//     database.query(sqlInsert, body, (err, result) => {
//       if (err) {
//         res.status(404).json({ err });
//       }
//       res.status(200).json(result);
//     });
//   } else {
//     const sqlInsert = "INSERT INTO posts SET ?";
//     database.query(sqlInsert, body, (err, result) => {
//       if (err) {
//         res.status(404).json({ err });
//       }
//       const sqlUpdate = `UPDATE posts SET post_file = ? WHERE post_id = ${result.post_id}`;
//       database.query(sqlUpdate, [file.filename], (err, result) => {
//         if (err) {
//           res.status(404).json({ err });
//         }
//         res.status(200).json(result);
//       });
//     });
//   }
// };

// post_id will be equal to the post inserted, and will be reused to link the image at the correct post in the below query
// const post_id = result.insertId;
// if (file) {
//   const sqlInsertImage = `INSERT INTO images (image_url, post_id) VALUES ("${file.filename}", ${post_id})`;
//   database.query(sqlInsertImage, (err, result) => {
//     if (err) {
//       res.status(404).json({ err });
//       throw err;
//     }
//     res.status(200).json(result);
//   });
// } else {
//   res.status(200).json(result);
// }
//   const fileName = req.file.filename;
//   const filePath = `./images/uploads/posts/${fileName}`;

//   database.query(
//     `INSERT INTO posts (post_file, post_id)  VALUES( "${filePath}", "${post_id}")`,
//     (err, result) => {
//       if (err) {
//         res.status(404).json(err);
//       }
//       if (result) {
//         res.status(200).json({
//           message: "image uploaded",
//         });
//       }
//     }
//   );
// });
exports.createPost = (req, res, next) => {
  let { body, file } = req;
  console.log(body);
  console.log(req.body.post_image, "req.file");
  if (!file) delete req.file;
  body = {
    ...body,
  };

  const sqlInsert = "INSERT INTO posts (content, user_id) VALUES (?, ?)";
  database.query(
    sqlInsert,
    [req.body.content, req.params.id],
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      const post_id = result.insertId;
      if (file) {
        const fileName = req.file.filename;
        const filePath = `./images/uploads/posts/${fileName}`;
        const sqlInsertImage = `INSERT INTO images (image_url, post_id) VALUES ("${filePath}", ${post_id})`;
        database.query(sqlInsertImage, (err, result) => {
          if (err) {
            res.status(404).json({ err });
            throw err;
          }
          console.log("image", filePath);
          res.status(200).json(result);
        });
      } else {
        res.status(200).json(result);
      }
    }
  );
};

exports.deleteOnePost = (req, res) => {
  const { id: postId } = req.params;
  database.query(
    "DELETE FROM posts WHERE post_id = ?",
    [postId],
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if (result) {
        res.status(200).json(result);
      }
    }
  );
};

exports.likePost = (req, res) => {
  const { userId, postId } = req.body;
  const sqlSelect = `SELECT * FROM likes WHERE user_id = '${userId}' AND post_id ='${postId}'`;
  database.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({ err });
      throw err;
    }

    if (result.length === 0) {
      const sqlInsert = `INSERT INTO likes (user_id, post_id) VALUES (?,?)`;
      database.query(sqlInsert, [userId, postId], (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json({ message: "like added" });
      });
    } else {
      const sqlDelete = `DELETE FROM likes WHERE likes.user_id = ${userId} AND likes.post_id = ${postId}`;
      database.query(sqlDelete, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json(err);
          throw err;
        }
        res.status(200).json(result);
      });
    }
  });
};
exports.likePostTwo = (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;

  database.query(
    "INSERT INTO likes (user_id, post_id) VALUES (?,?)",
    [user_id, post_id],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      database.query(
        "UPDATE posts SET likes = likes + 1 WHERE id = ?",
        post_id,
        (err2, results2) => {
          res.send(results);
        }
      );
    }
  );
};

exports.countLikes = (req, res) => {
  const postId = req.params.id;
  const sqlInsert = `SELECT COUNT(*) AS total FROM likes WHERE likes.post_id = ${postId}`;
  database.query(sqlInsert, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.postLikedByUser = (req, res) => {
  const { userId, postId } = req.body;
  const sql = `SELECT post_id, user_id FROM likes WHERE user_id = ${userId} AND post_id = ${postId}`;
  database.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
