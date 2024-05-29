
const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "localhost",
            port: 1025,
            secure: false,
        });
        console.log(req.body);
        const { from, to, message, subject } = req.body;

        const info = await transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            // text: "Hello world?", // plain text body
            html: message, // html body
        });

        res.status(200).json({
            message: `Message send ${info.messageId}`
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error", err
        })

    }
}
const emailController = {
    sendMail
}

module.exports = emailController;