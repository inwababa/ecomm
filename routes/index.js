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
router.patch("/forgotpassword", cleanBody, UserController.ForgotPassword)
router.patch("/resetpassword", cleanBody, UserController.ResetPassword)
router.post("/createitem/:id", cleanBody, ItemController.CreateItem)
router.get("/getitem", ItemController.GetItem)
router.get("/singleitem/:id", ItemController.GetItem)
router.post("/createorder", OrderController.Createorder)
router.post("/pay", OrderController.Checkout)
router.get("/getorder", OrderController.OneOrder)
router.post("/addcartitem/:id", cleanBody, CartController.CreateCart)


//router.get("/single/:id", UserController.SingleUser)


module.exports = router;