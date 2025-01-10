const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 8000;
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://mbiopeter401:austhropithecus!@cluster0.kfykf.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log("error connecting", err)
})

app.listen(port, '0.0.0.0', () => {
    console.log("server listening on", port)
})

//model importation
const User = require('./models/User');
const Order = require('./models/Order');

//function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
    //create node mail transport
    const transporter = nodemailer.createTransport({
        //configure the email service
        service: "gmail",
        auth: {
            user: "mbiopeter401@gmail.com",
            pass: "mxzs wstd lzna pavi"
        }
    });

    //compose the email message
    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email: http://localhost:${port}/verify/${verificationToken}`
    };

    //send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.log('Error sending verification email', error)
    }
}

//user registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("req received");

        //check if the email is already registred
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' })
        }

        //create a new user and
        const newUser = new User({ name, email, password });

        //generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString('hex');

        //save the user to the database
        await newUser.save();

        //send verification email to the use
        sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(201).json({ message: "Registration successful. Please check your email for verification." });

    } catch (error) {
        console.log('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed!' });
    }
});

//email verification endpoint
app.get('/verify/:token', async (req, res) => {
    try {
        const token = req.params.token;

        //find the user with the given verification token
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(404).json({ message: "invalid verification token!" })
        }

        //mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Email verification failed!" });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
}

const secretKey = generateSecretKey();

//endpoint to log in the user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if the user is exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "invalid email or password!" });
        }

        //check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "invalid password!" });
        }
        //generate a token
        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login Failed!" });
    }
});