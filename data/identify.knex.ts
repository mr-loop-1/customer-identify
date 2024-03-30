import { knex } from "../database";

export const identifyCustomer = async (propName, value) => {
    const query = knex("customers");

    query.where(propName, value);

    return await query;
};
