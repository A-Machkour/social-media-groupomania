const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './config/.env' });
const database = require('./config/database');

app.use(helmet());
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// ROUTES
const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const postRoutes = require('./routes/post-routes');
const commentRoutes = require('./routes/comment-routes');

// ROUTES MIDDLEWARE
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/users', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);


app.get('/api/users/register ', (req, res) => {
  database.query("INSERT INTO users (username,password,email) VALUES ('mcefwsaefw', '123123','tsdfsdfest@test.fr')",
   (err, results) => {
     console.log(err);
    res.send(results);
   });
});

app.listen(process.env.PORT, (res,req) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});