const express = require ('express');
const { SignUp, Login, Logout } = require("../controller/auth");
const router = express.Router();

router.route("/signup").post(SignUp)
router.route("/login").post(Login)
router.route("/logout").get(Logout)
