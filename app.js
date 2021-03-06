const express = require("express");
const router = express.Router();
const User = require("./models/user");
const userRouter = require("./routes/user");
const productsRouter = require("./routes/productsRouter");

require("dotenv").config();
require("./models/dataBase");




const app = express();
app.set("view-engine", "ejs")
app.use(express.urlencoded({ extended: false}))

app.use(express.json());
app.use(userRouter);
app.use(productsRouter);


app.get("/create-user", (req, res) => {
    res.render("create-user.ejs");

});


app.get("/sign-in", (req, res) => {
    res.render("sign-in.ejs");

});

app.get("/upload-profile", (req, res) => {
    res.render("upload-profile.ejs");

});



app.listen(6660, ()=> {
    console.log("Server Running on Port 6660");
});