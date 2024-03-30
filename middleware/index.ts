// import { IRequest } from "../interfaces/request";
import RequestDTO from "./../dto/index";
import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

const middleware = async (req: Request, res: Response, next: NextFunction) => {
    let body;
    try {
        body = plainToClass(RequestDTO, req.body);

        const errors = await validate(body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
    } catch (err) {
        return res.status(400).json({ err });
    }

    if (!body?.email && !body?.phoneNumber) {
        res.status(400).json({
            error: "please provide either email or phone number",
        });
    }

    // let hasPhone = false,
    //     hasEmail = false;
    // req.body.info = {};

    next();
};

export default middleware;
