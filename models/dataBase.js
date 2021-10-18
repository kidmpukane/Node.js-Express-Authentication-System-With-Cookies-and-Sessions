//Authentication App
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=> {
    console.log("Database Connected")
}).catch(err => console.log(err.message))