const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const User = require('../models/User');

function autenticarUsuario(req, res, next) {
    const token = req.cookies.authToken;

    if (token) {
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                res.clearCookie('authToken');
                res.redirect('user/login');
            }

            const user = await User.findOne({
                where: { id: decoded.id },
                attributes: ['id', 'name'],
                raw: true
            });

            if(user) {
                req.user = user;
                next();
            } else {
                res.clearCookie('authToken');
                res.redirect('user/login');
            }

        });
    } else {
        res.redirect('/user/login');
    }
}

function semUsuario(req, res, next) {
    const token = req.cookies.authToken;

    if (token) {
        res.redirect('/');
    } else {
        next();
    }
}

module.exports = {
    autenticarUsuario,
    semUsuario
};