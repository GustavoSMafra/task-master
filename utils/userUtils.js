const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const User = require('../models/User');

function authenticateUser(req, res, next) {
    const token = req.cookies.authToken;

    if (token) {
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                res.clearCookie('authToken');
                res.redirect('/user/login');
            }

            const user = await User.findOne({
                where: { id: decoded.id },
                attributes: ['id', 'name'],
                raw: true
            });

            if(user) {
                req.user = user;
                res.locals.user = req.user;
                next();
            } else {
                res.clearCookie('authToken');
                res.redirect('/user/login');
            }

        });
    } else {
        res.redirect('/user/login');
    }
}

function withoutUser(req, res, next) {
    const token = req.cookies.authToken;

    if (token) {
        res.redirect('/');
    } else {
        next();
    }
}

module.exports = {
    authenticateUser,
    withoutUser
};