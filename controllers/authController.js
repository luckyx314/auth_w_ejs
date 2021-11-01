exports.signup_get = (req, res, next) => {
    res.render("signup");
};

exports.signup_post = (req, res, next) => {
    const {email, password} = req.body;
    res.status(201).json({
        success: true,
        data: "Signup complete"
    })
};

exports.login_get = (req, res, next) => {
    res.render("login");
};

exports.login_post = (req, res, next) => {
    const {email, password} = req.body;
    res.status(201).json({
        success: true,
        data: "Login complete"
    })
};
