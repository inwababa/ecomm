require("dotenv").config();
const Item = require("../models/item")
const ObjectId = require("mongoose").Types.ObjectId;


exports.CreateItem = async (req, res) => {
    const owner = req.params.id
    try {

        const { name, description, category, price } = req.body

        const newItem = new Item({
            name: name,
            description: description,
            category: category,
            price: price,
            owner: owner
        });

        const item = await newItem.save()

        return res.status(200).json({
            item,
            success: true,
            message: "Item Created",
          });
        
    } catch (error) {
        console.error("signup-error", error);
        return res.status(500).json({
          error: true,
          message: "Cannot Create Item",
        });  
    }
}

exports.GetItem = async(req, res) => {
    try {
        const items = await Item.find({})
        res.status(200).send(items)
    } catch (error) {
        res.status(400).send(error)
    }
}