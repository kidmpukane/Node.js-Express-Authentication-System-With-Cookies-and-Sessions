
const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    productDescription: {
        type: String,
        required: true,
    },
    productImage: { type: String }
})

const ProductSchema =mongoose.model("products", productSchema);
module.exports = ProductSchema;