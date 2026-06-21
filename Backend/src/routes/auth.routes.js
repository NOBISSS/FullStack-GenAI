const authRouter=require('express').Router();
const authController=require("../controllers/auth.controller");
const authMiddleware=require("../middlewares/auth.middleware");
/**
 * @route POST /api/auth/register
 * @description Register a new User
 * @access Public
 */

authRouter.post("/register",authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login",authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description logout user,clear token from cookie and add token in blackList
 * @access Public
 */
authRouter.get("/logout",authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

module.exports=authRouter;

