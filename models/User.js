const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"], // [function, errorMsg]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Minimum password length is 6 characters"],
    },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
