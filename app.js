require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
require("./auth/passportGoogleConfig")(passport);
require("./auth/passportJwtConfig")(passport);


const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI')
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel')
const rootRouter = require('./routes/rootRouter')(Book);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', rootRouter)

app.get('/', (req, res) => {
  res.send('Firdaus is here');
});

// this need to be last to catch all errors
app.use((err, req, res, next) => {

    if(err){
        console.error(err.stack)
        res.status(400).send('Something broke!')
    }
    next();
})

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
