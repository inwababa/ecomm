const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId

const itemSchema = new Schema({
    owner : {
       type: ObjectID,
       required: true,
       ref: 'User'
    },
    name: {
       type: String,
       required: true,
       trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
       type: String,
       required: true
    },
    price: {
       type: Number,
       required: true
    }
    }, 
    {
        timestamps: {
          createdAt: "createdAt",
          updatedAt: "updatedAt",
        },
      }
    );
    const Item = mongoose.model("item", itemSchema);
    module.exports = Item;