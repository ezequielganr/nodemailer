const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

const TO = [];

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const config = {
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
};

const template = require("./template");

app.post("/api/contact", async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let subject = req.body.subject;
    let text = req.body.text;

    let data = {
        name: name,
        email: email,
        subject: subject,
        text: text
    }

    try {
        let transporter = nodemailer.createTransport(config);

        let info = await transporter.sendMail({
            from: "IT <it@outlook.com>",
            to: TO,
            subject: subject,
            html: template.get(data)
        });

        res.json({
            message: info.messageId
        });
    } catch (e) {
        res.status(500).json({
            error: "Email could not be sent"
        });
    }
});

app.listen(port);
