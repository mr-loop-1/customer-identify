import { Request, Response } from "express";

import { getCustomerById, identifyCustomer } from "../data/index";
import handleOne from "../services/handleOne";
import handlePair from "../services/handlePair";
import transform from "../transformer/index";

const controller = async (req: Request, res: Response) => {
    let results, primaryId, primary;
    try {
        if (req.body?.phoneNumber && req.body?.email) {
            primaryId = await handlePair(req.body);
        } else if (req.body?.phoneNumber) {
            primaryId = await handleOne("phoneNumber", req.body);
        } else {
            primaryId = await handleOne("email", req.body);
        }
        results = primaryId && (await identifyCustomer(primaryId));
        primary = primaryId && (await getCustomerById(primaryId));
    } catch (err) {
        res.status(500).json({ message: "Something went wrong!", errors: err });
    }
    const data = transform(primary, results);
    res.status(200).json(data);
};

export default controller;
