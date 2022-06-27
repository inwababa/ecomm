const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId

const cartSchema = new Schema({
    owner : {
      type: ObjectID,
       required: true,
       ref: 'User'
     },
    items: [{
      itemId: {
       type: ObjectID,
       ref: 'Item',
       required: true
    },
    name: String,
    quantity: {
       type: Number,
       required: true,
       min: 1,
       default: 1},
       price: Number
     }],
    bill: {
        type: Number,
        required: true,
       default: 0
      }
    },
    {
        timestamps: {
          createdAt: "createdAt",
          updatedAt: "updatedAt",
        },
      }
    );
    const Cart = mongoose.model("cart", cartSchema);
    module.exports = Cart;