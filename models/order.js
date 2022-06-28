const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId

const orderSchema = new Schema({
    
    orderId: {
       type: String,
       required: true,
       trim: true
    },
    
        itemId: {
         type: ObjectID,
         ref: 'Item',
         required: true
      },
      itemName: {type: String},
      quantity: {
         type: Number,
         required: true,
         },
         price: {type: Number},
      
    }, 
    {
        timestamps: {
          createdAt: "createdAt",
          updatedAt: "updatedAt",
        },
      }
    );
    const Order = mongoose.model("order", orderSchema);
    module.exports = Order;