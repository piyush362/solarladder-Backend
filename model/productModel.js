import mongoose from "mongoose";
const { Schema } = mongoose;


//  #general details
// 1 itemName,
// 2 itemCode,
// 3 itemDescription
// 4 categeory

//  #stock details
// 5 stockQuantity
// 6 lowStock
// 7 purchaseValue

// {
//     "itemName": "",
//     "itemCode": "",
//     "itemDescription": "",
//     "categeory": "",
//     "stockQuantity": "",
//     "lowStock": "",
//     "stockOnHold": ""
//     "purchaseValue": ""
// }

const productSchema = new Schema({
    // item general details
    itemName: {
        type: String,
        required: true
    },
    itemCode: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
    },
    categeory: {
        type: String,
        required: true
    },
    image: String,


    // stock details
    stockQuantity: {
        type: String,
        required: true
    },

    lowStock: String,

    stockOnHold: String,

    purchaseValue: {
        type: String,
        required: true
    },


    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Product = mongoose.model('Product', productSchema);

export default Product;


