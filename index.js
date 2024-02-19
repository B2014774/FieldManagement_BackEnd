const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
const mongoose = require("mongoose");

//Api Error

const ApiError = require("./app/api-error");

//import Router

const fieldsRouter = require("./app/routes/field.routes");
const sportsRouter = require("./app/routes/sport.routes");
const fieldManagerRouter = require("./app/routes/fieldManager.routes");
const customerRouter = require("./app/routes/customer.routes");
const ratingRouter = require("./app/routes/rating.routes");

app.use(cors());
app.use(bodyParser.json());
//Morgan
app.use(morgan("common"));

//test server
app.get("/", (req, res) => {
    res.json({message: "Test Server"});
});

//Truyền Route
app.use("/api/fields", fieldsRouter);
app.use("/api/sports", sportsRouter);
app.use("/api/fieldManagers", fieldManagerRouter);
app.use("/api/customers", customerRouter);
app.use("/api/rating", ratingRouter);
//Lỗi 404
app.use((req,res,next) => {
    return next(new ApiError(404, "Không tìm thấy trang"));
});

//Lỗi hệ thống
app.use((err,req,res,next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Lỗi hệ thống",
    });
});

module.exports = app;