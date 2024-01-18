const express = require ('express');
const { SignUp, Login, Logout, forgotPassword, changePassword } = require("../controller/auth");
const { isLoggedIn } = require('../middleware/auth');
const { createTodo, getSingleTodo, getAllTodos, updateTodo, deleteTodo } = require('../controller/todocontroller');



const router = express.Router();

router.route("/signup").post(SignUp)
router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.route("/forgot-password").post(forgotPassword)
router.route("/change-password").patch(changePassword)
router.route("/create-todo").post([isLoggedIn],createTodo)
router.route("/get-todo/:id").get([isLoggedIn], getSingleTodo)
router.route("/getall-todo").get([isLoggedIn], getAllTodos)
router.route("/update-todo/:id").patch([isLoggedIn], updateTodo)
router.route("/delete-todo/:id").delete([isLoggedIn], deleteTodo)


module.exports = router