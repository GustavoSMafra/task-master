const User = require('../models/User');
const Task = require('../models/Task');


module.exports = class SiteController {
    
    static async homeView(req, res) {
        res.redirect('/task/');
    }

}