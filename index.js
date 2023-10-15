"use strict";

// import core modules
const path = require("path");

// import third-party libraries
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// import routers
const authRouter = require("./routers/auth");

// create application
const app = express();

// set public directory and view template engine
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Router connected to app
app.use(authRouter);

// connect to db
mongoose
  .connect("mongodb://127.0.0.1/mydb")
  .then(() => {
    // app startup
    console.log("connected to db");
    app.listen(3000);
    console.log("listening to port 3000");
  })
  .catch((err) => {
    console.log("db connection error");
    console.log(err);
  });
