const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
    // console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

// jwt function
const maxAge = 3 * 24 * 60 * 60; // time in seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};

// Route controllers
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
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({
            success: true,
            msg: "User created",
            user: user._id,
        });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({
            success: false,
            errors,
        });
    }
};

exports.login_post = async (req, res, next) => {
    const { email, password } = req.body;
    res.status(201).json({
        success: true,
        data: "Login complete",
    });
};
