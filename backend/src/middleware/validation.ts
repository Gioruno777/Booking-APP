import { body, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"

const HandleValidationErrors = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}

export const SignValidationRequest = [
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("password").isString().notEmpty().withMessage("Password is required"),
    body("passwordConfirm")
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Inconsistent password"),
    body("firstname").isString().notEmpty().withMessage("FirstName is required"),
    body("lastname").isString().notEmpty().withMessage("LastName is required"),
    HandleValidationErrors
]