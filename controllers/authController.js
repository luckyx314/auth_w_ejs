const User = require("../models/User");

exports.signup_get = (req, res, next) => {
    res.render("signup");
};

exports.login_get = (req, res, next) => {
    res.render("login");
};

exports.signup_post = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({
            email,
            password,
        });
        res.status(201).json({
            success: true,
            msg: "User created",
            data: user
        });
    } catch (error) {
        console.log(error.code)
        res.status(400).json({
            success: false,
            msg: "Error: User not created."
        })
    }
};

exports.login_post = async (req, res, next) => {
    const { email, password } = req.body;
    res.status(201).json({
        success: true,
        data: "Login complete",
    });
};
