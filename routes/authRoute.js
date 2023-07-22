const express = require('express');
const passport = require("passport");

function routes(){
    const authRouter = express.Router();
    authRouter.get('/google',
        passport.authenticate('google', { session: false, scope:
                ['openid', 'profile', 'email'] }
        ));

    authRouter.get('/callback/google',
        passport.authenticate('google', {
            session: false,
            failureRedirect: '/'
        }), (req, res) => {
            // console.log('user: ', JSON.stringify(req.user, null, 2))

            if (req.user.accessToken) {
                res.json({
                    success: true,
                    token: req.user.accessToken,
                    refreshToken: req.user.refreshToken,
                    expire: req.user.expire
                })
            } else {
                res.json({
                    success: false
                })
            }
        }
    )
    return authRouter;
}

module.exports = routes;