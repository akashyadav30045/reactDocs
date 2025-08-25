import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import userModel from "./userModel";

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user) {
            res.status(409).json({ message: "User already exists, you can login", success: false });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        const errorMsg = "Auth failed: Email or password is incorrect";
        if (!user) {
            res.status(403).json({ message: errorMsg, success: false });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(403).json({ message: errorMsg, success: false });
            return;
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
