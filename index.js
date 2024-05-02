const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const helpers = require('handlebars-helpers')();

const hbs = exphbs.create({
    helpers: helpers,
});

const app = express();
app.use(cookieParser());
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride((req, res) => {
    return req.body._method;
}));

const conn = require("./db/conn");

const siteRoutes = require("./routes/siteRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const checklistRoutes = require("./routes/checklistRoutes");

app.use('/', siteRoutes);
app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/category', categoryRoutes);
app.use('/checklist', checklistRoutes);

conn.sync().then(() => {
    app.listen(Number(process.env.PORT));
}).catch(err => console.log(err));