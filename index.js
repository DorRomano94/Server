require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = Number(process.env.PORT || 3331);
const errorHandler = require('./src/Middleware/errorHandler');

const userRoute = require('./src/Routes/user.route');

app.use(express.json());
app.use(cors());
app.options("*", cors());



app.use('/user', userRoute);

app.use(errorHandler)
app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

module.exports = app
