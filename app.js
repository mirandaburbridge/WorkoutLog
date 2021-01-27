require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let user = require('./controllers/user-controller');
let log = require('./controllers/log-controller');

sequelize.sync();
//sequelize.sync({force: true})

app.use(express.json());

app.use('/user', user);

// app.use(require('./middleware/validate-session'));
app.use('/log', log)

app.listen(3000, function () {
    console.log('App is listening on port 3000');
})