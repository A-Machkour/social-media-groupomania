const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
const { requireAuth } = require("./middleware/auth-middleware");

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

// ROUTES
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const commentRoutes = require("./routes/comment-routes");

// ROUTES MIDDLEWARE
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
