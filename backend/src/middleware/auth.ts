import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"]

    if (!token) {
        res.status(401).json({ message: "unauthorized" })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.userId = (decoded as JwtPayload).userID
        next()
    } catch (err) {
        res.status(401).json({ message: "unauthorized" })
        return
    }
}

export default verifyToken