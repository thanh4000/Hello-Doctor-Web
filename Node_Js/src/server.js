import express from "express";

// hỗ trợ lấy các tham số phía client 
// sử dụng
import bodyParser from "body-parser";

import viewEngine from "./config/viewEngine";

import initWebRoutes from "./route/web";

import connectDB from './config/connectDB'


// giúp chạy đc dòng process.env.PORT
require('dotenv').config();
// import dotenv from "dotenv";

// let dotenv = dotenv.config();


let app = express();

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

viewEngine(app);
initWebRoutes(app);

connectDB();

// let port = process.env.PORT || 6969;
let port = process.env.PORT;
// Port === undefined => port = 6969

app.listen(port, () => {
    //call back function
    console.log("backend NodeJs is running on the port: "+port);
});

