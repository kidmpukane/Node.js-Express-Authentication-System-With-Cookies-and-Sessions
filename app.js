const express = require("express");
require("dotenv").config();
require("./models/dataBase");
const userRouter = require("./routes/user");

const User = require("./models/user");

const app = express();
app.set("view-engine", "ejs")
app.use(express.urlencoded({ extended: false}))

app.use(express.json());
app.use(userRouter);


app.get("/create-user", (req, res) => {
    res.render("register_form.ejs");

});

app.get("/sign-in", (req, res) => {
    res.render("login.ejs");

});

app.get("/upload-profile", (req, res) => {
    res.render("profile.ejs");

});


app.listen(6660, ()=> {
    console.log("Server Running on Port 6660");
});