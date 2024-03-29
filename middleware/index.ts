import { IRequest } from "../interfaces/request";

const validator = (req, res, next) => {
    const body: IRequest = req.body;

    if (body.phoneNumber) {
    }
};
