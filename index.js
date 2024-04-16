const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require('cookie-parser');
const helpers = require('handlebars-helpers')();

const hbs = exphbs.create({
    helpers: helpers,
});

console.log(hbs.helpers.log)

const app = express();
app.use(cookieParser());
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(
    express.urlencoded({
        extended: true
    })
);

const conn = require("./db/conn");

const siteRoutes = require("./routes/siteRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentRoutes = require("./routes/commentRoutes");
const checklistRoutes = require("./routes/checklistRoutes");

app.use('/', siteRoutes);
app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/category', categoryRoutes);
app.use('/comment', commentRoutes);
app.use('/checklist', checklistRoutes);

app.use(express.json());

conn.sync().then(() => {
    app.listen(3000);
}).catch(err => console.log(err));


// conn.sync({force: true}).then(() => {
//     app.listen(3000);
// }).catch(err => console.log(err));