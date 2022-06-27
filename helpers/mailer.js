require("dotenv").config();
const nodemailer = require('nodemailer');

const sendEmail =  async (email, code) => {
    try {
        var toAddress = email;

        var subject = "Verify your email";
    // The body of the email for recipients
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p>Your authentication code is : </p> <b>${code}</b>
      </body>
    </html>`;
    
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4b56b31de9607c",
                pass: "2a7f5e2334010b"
            }
          });

          const mailOptions= {
            from: '"Test Server" <test@example.com>',
            to: toAddress,
            subject: subject,
            html: body_html
          };
          
          transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Cannot Send Email",
          });
    }
}

module.exports = { sendEmail };