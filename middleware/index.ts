// import { IRequest } from "../interfaces/request";
import RequestDTO from "./../dto/index.ts";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

const middleware = async (req, res, next) => {
    const body = plainToClass(RequestDTO, req.body);
    const errors = await validate(body);

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // let hasPhone = false,
    //     hasEmail = false;

    if (body?.phoneNumber) {
        req.body.phoneNumber = Number(body.phoneNumber);
        req.info.hasPhone = true;
    }

    if (body?.email) {
        req.info.hasEmail = true;
    }

    // if (hasPhone && hasEmail) {
    //     req.info.propNum = 2;
    //     // req.info.
    // }

    // res.json("success");
    next();
};

export default middleware;
