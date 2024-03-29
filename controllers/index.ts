import { getCustomer } from "./../data/query.knex.ts";

const controller = async (req, res, next) => {
    if (req.info.hasPhone && req.info.hasEmail) {
        // both are present
    } else {
        // get the prop name
        // await getCustomer(req.info.hasPhone ? "phone" : "email");
    }
};

export default controller;
