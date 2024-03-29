import handlePair from "../services/handlePair.ts";
import { getCustomer } from "./../data/query.knex.ts";

const controller = async (req, res, next) => {
    if (req.info.hasPhone && req.info.hasEmail) {
        // both are present
        await handlePair(req.body);
        //? Not fetching data above since concurrent requests could render it outdated
    } else {
        // get the prop name
        // await getCustomer(req.info.hasPhone ? "phone" : "email");
    }
};

export default controller;
