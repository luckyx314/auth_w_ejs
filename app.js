require("dotenv").config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middleware 
app.use(express.static("public"));
app.use(express.json())

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.MONGODB_URI;
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// routes
app.use("/api/auth", require("./routes/authRoutes")) // auth route
