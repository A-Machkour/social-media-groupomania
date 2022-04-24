const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv').config({ path: './config/.env' });
const database = require('./config/database');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// ROUTES
const userRoutes = require('./routes/user-routes');
app.use('/api/users', userRoutes);


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