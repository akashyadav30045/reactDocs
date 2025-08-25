import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./Book/bookRouter";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());


// Routes
// Http methods: GET, POST, PUT, PATCH, DELETE
app.get("/", (req:Request, res:Response, next:NextFunction) => {
  res.json({ message: "Welcome to elib apis" });
});

app.use(globalErrorHandler);
app.use('/auth/',userRouter)
app.use('/api/books/',bookRouter)

export default app;
