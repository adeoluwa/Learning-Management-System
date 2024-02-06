const express = require("express");
const { registerAUser, loginUser, getAllUsers, getUser, updateUser } = require("../controllers/user_controller");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const userRouter = express.Router();

/** post routes*/
userRouter.post("/register",registerAUser);
userRouter.post("/login", loginUser);

/** get routes*/
userRouter.get("/all-users", getAllUsers)
userRouter.get("/get-user/:id", getUser)

/** put routes*/ 
userRouter.put("/update-profile/:id", authMiddleware, updateUser)


module.exports = userRouter;