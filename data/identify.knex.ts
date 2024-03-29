import { knex } from "../database";

export const identifyCustomer = async (propName, value, linkPrecendence) => {
    const query = knex("customers");

    query.where(propName, value);

    if (linkPrecendence) {
        query.where("linkPrecedence", linkPrecendence);
        query.first();
    }

    return await query;
};
