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

// Mongoose Hooks
// fire a function after doc (new user) saved to db
UserSchema.post("save", function(doc, next) {
    console.log("New user was created and saved", doc)
    next(); // important - always put this
})

// fire a function before a doc (new user) saved to db
UserSchema.pre("save", function(next) {
    console.log("User about to be created and saved", this)
    next()
})

const User = mongoose.model("user", UserSchema);

module.exports = User;
