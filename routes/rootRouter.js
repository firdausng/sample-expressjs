const express = require('express');
const Book = require("../models/bookModel");
const passport = require("passport");
const bookRouter = require('./bookRouter')(Book);
const authRouter = require('./authRoute')();


function authenticateJwt(req, res, next) {
    passport.authenticate('jwt', { session: false },
        function(err, user, info) {
            if (err) return next(err);
            if (!user) throw new Error('User is not authenticated.');
            req.user = user;
            next();
        })(req, res, next);
}

function routes(Book){
    const rootApiRouter = express.Router();
    rootApiRouter.use('/books', authenticateJwt, bookRouter);
    rootApiRouter.use('/auth', authRouter);

    return rootApiRouter;
}

module.exports = routes;