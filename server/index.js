const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const employeeRoute = require('./routes/employeeRoute');
const blogRoute = require('./routes/blogRoute');

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));


app.use('/blog', express.static(path.join(__dirname, 'public/blog')));
app.use('/profile', express.static(path.join(__dirname, 'public/profile')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 100000,
        secure: true
    }
}));

app.use('/api/employees', employeeRoute);
app.use('/api/blogs', blogRoute);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));