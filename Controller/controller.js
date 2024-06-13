// const dotenv = require('dotenv');

// dotenv.config()
// const orgEmail = process.env.EMAIL;
// const lessPassword = process.env.LESS_PASSWORD;

// console.log(orgEmail, lessPassword);

// const nodemailer = require("nodemailer");

// const sendMail = async (req, res) => {

//     try {

//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true, // Use true for port 465, false for all other ports
//             auth: {
//                 user: orgEmail,
//                 pass: lessPassword,
//             },
//         });

//         console.log(req.body);
//         const { from, to, message, subject } = req.body;

//         // const info = await transporter.sendMail({
//         //     from: from, // sender address
//         //     to: to, // list of receivers
//         //     subject: subject, // Subject line
//         //     // text: "Hello world?", // plain text body
//         //     html: message, // html body
//         // });

//         const payload = {
//             from: orgEmail,
//             to,
//             subject,
//             html: message
//         }

//         transporter.sendMail(payload, (err, data) => {

//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log("Email is sent to ", to);
//             }
//         })

//         res.status(200).json({
//             message: `Message send ${info.messageId}`
//         })

//     } catch (err) {
//         res.status(500).json({
//             message: "Internal server error", err
//         })

//     }
// }
// const emailController = {
//     sendMail
// }

// module.exports = emailController;

const dotenv = require('dotenv');
const nodemailer = require("nodemailer");

dotenv.config();

const orgEmail = process.env.EMAIL;
const lessPassword = process.env.LESS_PASSWORD;

console.log(orgEmail, lessPassword);

const sendMail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use true for port 465, false for other ports
            auth: {
                user: orgEmail,
                pass: lessPassword,
            },
        });

        console.log(req.body);
        const { from, to, message, subject } = req.body;

        const payload = {
            from: from,
            to,
            subject,
            html: message
        };

        transporter.sendMail(payload, (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Failed to send email", error: err });
            } else {
                console.log("Email is sent to ", to);
                res.status(200).json({ message: `Message sent: ${info.messageId}` });
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

const emailController = {
    sendMail
};

module.exports = emailController;
