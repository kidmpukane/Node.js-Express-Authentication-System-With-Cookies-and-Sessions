const express = require("express");
const multer  = require("multer");
const path= require('path')
const ProductSchema = require("../models/products");
const upload = multer({ dest: "uploads/" });
const { uploadFile, getFileStream } = require("../controllers/productsController");

const router = express.Router();
require("dotenv").config();
require("../models/dataBase");

router.get("/upload-product",(req, res) => {
   res.render("upload-product.ejs") 
});

router.post("/upload-product", upload.single("productImage"), async(req, res) => {
   //information about the file is saved here
   const file = req.file
   console.log(file);
   const result = await uploadFile(file);
   console.log(result);
   //any other info in
   const description = req.body.description
   //saving products to database
   const postProduct = new ProductSchema({
      productName: req.body.productName,
      price: req.body.price,
      productDescription: req.body.productDescription,
      productImage: file.filename
  });
  postProduct.save()
   .then((result) => {
      res.status(200).json({  data: req.file
     })
     console.log(result);
      
   })
   .catch((err) => {
      console.log(err)
   });
});


module.exports = router;