const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        SKU: {
            type: String
        },
        // thumbnail:{
        //    img:{type:String}
        // },
        // productPictures: [
        //     {
        //         img: {
        //             type: String
        //         }
        //     }
        // ],
        productPictures: {
            type: String
        },
        stock: {
            type: Number,
            required: true,

        },
        color: {
            type: String,
            required: true,

        },
        category: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Product', productSchema);