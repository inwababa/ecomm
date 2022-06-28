require("dotenv").config();
const Order = require("../models/order")
const ObjectId = require("mongoose").Types.ObjectId;


exports.Createorder = async (req, res) => {
    const owner = req.params.id
    try {

        //generate refferer id
        var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var result = ""
        var charactersLength = characters.length;

        for ( var i = 0; i < 6 ; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        const { name, itemId, quantity, price } = req.body

        const newOrder= new Order({
            orderId: result,
            itemName: name,
            itemId: itemId,
            quantity: quantity,
            price: price,
            //owner: owner
        });

        const order = await newOrder.save()

        return res.status(200).json({
            order,
            success: true,
            message: "Order Created",
          });
        
    } catch (error) {
        console.error("order-error", error);
        return res.status(500).json({
          error: true,
          message: "Cannot Create Order",
        });  
    }
}

exports.OneOrder = async(req, res) => {
    const {orderId} = req.body
    try {
        const order = await Order.findOne({orderId})
        res.status(200).send(order)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.AllOder = async(req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).send(error)
    }
}


exports.Checkout = async (req, res) => {
       const { orderId } = req.body

    
    try {

        
        const order = await Order.findOne({orderId: orderId})
        
        const see = order.orderId
        

        if(orderId == see){
            return res.status(200).json({
                success: true,
                message: "You have successfully made a payment",
              });
        }


        
        
    } catch (error) {
        console.error("order-error", error);
        return res.status(500).json({
          error: true,
          message: "Payment Unsuccessful",
        });  
    }
}