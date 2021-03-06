const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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
// fire a function before a doc (new user) saved to db
UserSchema.pre("save", async function (next) {
    // console.log("User about to be created and saved", this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
