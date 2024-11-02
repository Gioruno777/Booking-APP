import express from "express"
import UserController from "../controllers/UserController"
import { SignValidationRequest } from "../middleware/validation"
import verifyToken from "../middleware/auth"
import { Request, Response } from "express"

const router = express.Router()

router.post('/signup',
    SignValidationRequest,
    UserController.SignupCurrentUser
)

router.post(
    '/login',
    UserController.LoginCurrentUser
)

router.post(
    '/logout',
    UserController.LogOutCurrentUser
)

router.get("/validatetoken",
    verifyToken,
    UserController.GetCurrentToken
)

export default router
