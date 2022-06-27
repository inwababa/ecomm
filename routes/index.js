const express = require("express");
const router = express.Router();
const cleanBody = require("../middleware/cleanbody");

const UserController = require("../controllers/user")
const ItemController = require("../controllers/item")
const CartController = require("../controllers/cart")
const OrderController = require("../controllers/order")


//Define Routes
router.post("/signup", cleanBody, UserController.Signup)
router.post("/login", cleanBody, UserController.Login)
router.post("/activate", cleanBody, UserController.Activate)
router.post("/forgotpassword", cleanBody, UserController.ForgotPassword)
router.post("/resetpassword", cleanBody, UserController.ResetPassword)
router.post("/createitem", cleanBody, ItemController.CreateItem)
router.get("/singleitem/:id", ItemController.GetItem)
router.post("/createorder", OrderController.Createorder)
router.get("/getorder", OrderController.OneOrder)
router.post("/addcartitem", cleanBody, CartController.CreateCart)


//router.get("/single/:id", UserController.SingleUser)


module.exports = router;