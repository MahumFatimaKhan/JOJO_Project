const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
//require('dotenv').config({"os":false , "fs":false ,"path":false});
require('./helpers/init_mongodb');
const { verifyAccessToken } = require('./helpers/jwt_helper')


var cors = require('cors');
app.use(cors({
    credentials: true,
    origin: "http://localhost:3001"
}
))

//Routes
const AdminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Sending to the Routes
app.use('/admin', AdminRoutes);
app.use('/product', productRoutes);

app.use('/category', categoryRoutes);
app.use('/order', orderRoutes);
app.use('/auth', authRoutes);
app.use('/user', verifyAccessToken, userRoutes);



app.get('/', verifyAccessToken, async (req, res, next) => {
    res.send("Hello!")
});


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;