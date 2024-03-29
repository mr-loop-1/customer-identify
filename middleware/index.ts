import { IRequest } from "../interfaces/request";
import RequestDTO from "./../dto/index.ts";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

const middleware = async (req, res, next) => {
    const requestDTO = plainToClass(RequestDTO, req.body);
    const errors = await validate(requestDTO);

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const body: IRequest = req.body;

    if (body?.phoneNumber) {
    }

    res.json("success");
};

export default middleware;
