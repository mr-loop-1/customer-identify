import { identifyCustomer } from "../data/identify.knex.ts";
import handleOne from "../services/handleOne.ts";
import handlePair from "../services/handlePair.ts";
import transform from "../transformer/index.ts";
import { getCustomer } from "./../data/query.knex.ts";

const controller = async (req, res, next) => {
    let results, data;
    try {
        if (req.body?.phoneNumber && req.body?.email) {
            await handlePair(req.body);
            //? Not fetching data above since concurrent requests could render it outdated
            results = await identifyCustomer(
                "phoneNumber",
                req.body?.phoneNumber
            );
        } else if (req.body?.phoneNumber) {
            await handleOne("phoneNumber", req.body.phoneNumber);
            results = await identifyCustomer(
                "phoneNumber",
                req.body?.phoneNumber
            );
        } else {
            await handleOne("email", req.body.email);
            results = await identifyCustomer("email", req.body?.email);
        }
        data = transform(results);
    } catch (err) {}

    res.status(200).json(data);
};

export default controller;
