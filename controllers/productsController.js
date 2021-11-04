const express = require("express");
const multer  = require("multer");
const Product = require("../models/products");

const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_ACCESS_KEY_SECRET
const profile = process.env.AWS_PROFILE

//this is where we are going to save the ish
const upload = multer({ dest: "uploads/" });

const s3 = new S3({
    region,
    profile,
    accessKeyId,
    secretAccessKey
  });
  // uploads a file to s3
    function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
  
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
      ContentType:"image/jpeg"  
    }
  
    return s3.upload(uploadParams).promise()
  }
  exports.uploadFile = uploadFile
  
  // downloads a file from s3
  function getFileStream(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
  
    return s3.getObject(downloadParams).createReadStream()
  }
  exports.getFileStream = getFileStream