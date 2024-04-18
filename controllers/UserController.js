const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

module.exports = class UserController {
    
    static async allUsers(req, res) {
        const users = await User.findAll({raw: true});
    }

    static async createUserView(req, res) {
        res.render('user/create', {
            layout: 'guest'
        });
    }

    static async loginUserView(req, res) {
        res.render('user/login', {
            layout: 'guest'
        });
    }

    static async createUser(req, res) {
        if(req.body.name && req.body.username && req.body.password) {
            const user = await User.findOne({where: {username: req.body.username}, raw: true});
            if(user) {
                res.render('user/create', {errorMessage: "Um usuário com esse username já foi cadastrado!"});
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then(async hash => {
                        const encryptedPassword = hash;
                        let newUser = {
                            name: req.body.name,
                            username: req.body.username,
                            password: encryptedPassword
                        }
                        await User.create(newUser);
                        res.redirect('/user/login');
                    });
            }
        } else {
            res.render('user/create', {errorMessage: "Preencha todos os campos!"});
        }        
    }

    static async loginUser(req, res) {
        if(req.body.username && req.body.password) {
            const user = await User.findOne({where: {username: req.body.username}, raw: true});
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(result) {
                    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
                    const options = {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        expires: new Date(Date.now() + 3600000)
                    };
                    res.cookie('authToken', token, options);
                    res.redirect('/');
                } else {
                    res.render('user/login', {
                        errorMessage: "Credenciais incorretas!",
                        layout: 'guest'
                    });
                }
            });
        } else {
            res.render('user/login', {
                errorMessage: "Preencha todos os campos!",
                layout: 'guest'
            });
        }
    }

    static logoutUser(req, res) {
        res.clearCookie('authToken');
        res.redirect('/user/login');
    }
}