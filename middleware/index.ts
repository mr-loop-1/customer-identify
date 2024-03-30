// import { IRequest } from "../interfaces/request";
import RequestDTO from "./../dto/index";
import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

const middleware = async (req: Request, res: Response, next: NextFunction) => {
    const body = plainToClass(RequestDTO, req.body);
    const errors = await validate(body);

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    if (!body?.email && !body?.phoneNumber) {
        res.status(400).json({
            error: "please provide either email or phone number",
        });
    }

    // let hasPhone = false,
    //     hasEmail = false;
    // req.body.info = {};

    if (body?.phoneNumber) {
        req.body.phoneNumber = Number(body.phoneNumber);
        // req.body.info.hasPhone = true;
    }

    // if (body?.email) {
    //     req.body.info.hasEmail = true;
    // }
    next();
};

export default middleware;
