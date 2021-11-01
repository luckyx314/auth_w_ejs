const express = require("express");
const router = express.Router();

const {
    signup_get,
    signup_post,
    login_get,
    login_post,
} = require("../controllers/authController");

// signup
router.route("/signup").get(signup_get);
router.route("/signup").post(signup_post);

// login
router.route("/login").get(login_get);
router.route("/login").post(login_post);

module.exports = router;
