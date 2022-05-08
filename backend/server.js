const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
const database = require("./config/database");
const cors = require("cors");
const { requireAuth } = require("./middleware/auth-middleware");

// const corsOptions = {
//   origin: ["http://localhost:5000", "http://localhost:3000"],
//   optionsSuccessStatus: 200, // some legacy browsers     (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Credentials": true,
  });

  next();
});
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    // ...
  })
);

app.use(helmet());
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// app.post("/api/posts/", upload.single("post_file"), (req, res, next) => {
//   let { body, file } = req;
//   if (!file) delete req.body.post_file;
//   body = {
//     ...body,
//   };

//   const sqlInsert = "INSERT INTO posts SET ?";
//   database.query(sqlInsert, body, (err, result) => {
//     if (err) {
//       res.status(404).json({ err });
//       throw err;
//     }
//     // post_id will be equal to the post inserted, and will be reused to link the image at the correct post in the below query
//     const post_id = result.insertId;
//     if (file) {
//       const sqlInsertImage = `INSERT INTO images (image_url, post_id) VALUES ("${file.filename}", ${post_id})`;
//       database.query(sqlInsertImage, (err, result) => {
//         if (err) {
//           res.status(404).json({ err });
//           throw err;
//         }
//         res.status(200).json(result);
//       });
//     } else {
//       res.status(200).json(result);
//     }
//   });
// });

// ROUTES
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const commentRoutes = require("./routes/comment-routes");

// ROUTES MIDDLEWARE
//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// jwt middleware

app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res[0].id.toString());
});

app.listen(process.env.PORT, (res, req) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
