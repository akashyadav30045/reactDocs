
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

const createBook = (req:Request,res:Response) =>{
    res.send({message:"Book created"});
}

export {createBook};