import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user"

const createSendToken = (userID: String, req: Request, res: Response) => {
    const token = jwt.sign(
        { userID: userID },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '1h' }
    )
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        maxAge: 3600000
    })
}

const SignupCurrentUser = async (req: Request, res: Response) => {
    try {

        const ExistingUser = await User.findOne({ email: req.body.email })

        if (ExistingUser) {
            res.status(400).send("User already exists")
            return
        }

        req.body.password = await bcrypt.hash(req.body.password, 8)
        req.body.passwordConfirm = undefined

        const user = new User(req.body)
        await user.save()

        createSendToken(user.id, req, res)

        user.password = undefined
        res.status(201).send({ message: "Singup Successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).send("Something Wrong")
    }

}

const LoginCurrentUser = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body

        const CurrentUser = await User.findOne({ email: email }).select("+password")

        if (!CurrentUser || !CurrentUser.password) {
            res.status(200).send("Nonexistent email")
            return
        }

        const match = await bcrypt.compare(password, CurrentUser.password)
        if (!match) {
            res.status(200).send("InCorrect password")
            return
        }

        createSendToken(CurrentUser.id, req, res)
        res.status(200).send({ userId: CurrentUser.id });

    } catch (error) {
        res.status(500).send(':(')
    }
}

const LogOutCurrentUser = async (req: Request, res: Response) => {
    res.cookie("auth_token", {
        expires: new Date(0)
    })
    res.status(200).json({ message: "Logged out successfully" });
}

const GetCurrentToken = async (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId })

}

export default {
    SignupCurrentUser,
    LoginCurrentUser,
    LogOutCurrentUser,
    GetCurrentToken
}