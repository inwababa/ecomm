require("dotenv").config();
const User = require("../models/user")
const bcrypt = require('bcryptjs');
const  postmark = require("postmark");
const ObjectId = require("mongoose").Types.ObjectId;


exports.Signup = async (req, res) => {
    try {
        const{ fullName, email, password } = req.body;
        

        // check duplicate email Number
        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return res.json({
              error: true,
              message: "Email is already in use",
            });
          }

          const hashpass =  bcrypt.hashSync(password, 10)

            // Create user in our database
            const user = await User.create({
                 fullName,
                 email, 
                 password: hashpass, 
                 
            });


        //create OTP
        const code = Math.floor(100000 + Math.random() * 900000);  //Generate random 6 digit code.
          
        // Send an email:
const client = new postmark.Client("f546ddb6-ea12-4187-beb0-f68dfcc6b608");

client.sendEmail({
    "From": "hello@funaabpay.com.ng", 
    "To": email, 
    "Subject": "Verify Email", 
    "TextBody": `Use the code:${code} to validate Account`
});
        //save OTP
                user.token = code;
                await user.save();

        // return new user
        // const ids = user.id;
        // const verified = emailExist.verified;

        return res.status(200).json({
            user,
            success: true,
            message: "Registration Success",
          });
    } 
    catch (error) {
        console.error("signup-error", error);
    return res.status(500).json({
      error: true,
      message: "Cannot Register",
    });
    }
};

exports.Login = async (req, res) => {
    try {

        const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Cannot authorize user.",
      });
    }

    //1. Find if any account with that email exists in DB
    const user = await User.findOne({ email: email });

    // NOT FOUND - Throw error
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Account not found",
      });
    }

    //2. Throw error if account is not activated
    if (!user.active) {
      return res.status(400).json({
        error: true,
        message: "You must verify your email to activate your account",
      });
    }
    //3. Verify the password is valid
    const isValid = await User.compareSync(password, user.password);
    if (!isValid) {
      return res.status(400).json({
        error: true,
        message: "Invalid credentials",
      });
    }

    
    
    //Success
    return res.send({
      success: true,
      message: "User logged in successfully",
     });
        
    } catch (error) {
        console.error("Login error", error);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
    }
}

exports.Activate = async (req, res) => {
    try {
      const { email, code } = req.body;
      
      if ( !email || !code) {
        return res.json({
          error: true,
          status: 400,
          message: "Please make a valid request",
        });
      }
      const user = await User.findOne({
        email: id,
        token: code
      });
      if (!user) {
        return res.status(400).json({
          error: true,
          message: "Invalid OTP provided",
        });
      } else {


         if (user.active)
          return res.json({
            error: true,
            message: "Account already activated",
            status: 400,
          });

        user.token = code;
        user.active = true;
        await user.save();
        return res.status(200).json({
            user,
          success: true,
          message: "Account activated.",
        });
      }
    } catch (error) {
      console.error("activation-error", error);
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  };

 
  
  exports.ForgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.send({
          status: 400,
          error: true,
          message: "Cannot be processed",
        });
      }
      const user = await User.findOne({
        email: email,
      });
      if (!user) {
        return res.send({
          success: true,
          message:
            "If that email address is in our database, we will send you an email to reset your password",
        });
      }
      let code = Math.floor(100000 + Math.random() * 900000);
      let response = await sendEmail(user.email, code);
      if (response.error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't send mail. Please try again later.",
        });
      }
      
      user.resetPasswordToken = code;
      
      await user.save();
      return res.send({
        success: true,
        message:
          "If that email address is in our database, we will send you an email to reset your password",
      });
    } catch (error) {
      console.error("forgot-password-error", error);
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
   };

   exports.ResetPassword = async (req, res) => {
    try {
      const { token, newPassword, confirmPassword } = req.body;
      if (!token || !newPassword || !confirmPassword) {
        return res.status(403).json({
          error: true,
          message:
            "Couldn't process request. Please provide all mandatory fields",
        });
      }
      const user = await User.findOne({
        resetPasswordToken: req.body.token,
    
      });
      if (!user) {
        return res.send({
          error: true,
          message: "Password reset token is invalid or has expired.",
        });
      }
      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          error: true,
          message: "Passwords didn't match",
        });
      }
      const hashpass =  bcrypt.hashSync(newPassword, 10)
      user.password = hashpass;
      user.resetPasswordToken = null;
      
      await user.save();
      return res.send({
        success: true,
        message: "Password has been changed",
      });
    } catch (error) {
      console.error("reset-password-error", error);
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  };