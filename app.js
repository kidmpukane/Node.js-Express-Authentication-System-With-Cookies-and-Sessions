const express = require("express");
require("dotenv").config();
require("./models/dataBase");
const userRouter = require("./routes/user");

const User = require("./models/user");

const app = express();

app.use(express.json());
app.use(userRouter);

app.get("/", (req, res)=> {
    res.send("Fuck Off");

});

app.listen(6660, ()=> {
    console.log("Server Running on Port 6660");
});