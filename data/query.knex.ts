import { knex } from "../database";

export const getCustomer = async (propName, value, linkPrecendence) => {
    const query = knex("customers");

    query.where(propName, value);

    if (linkPrecendence) {
        query.where("linkPrecedence", linkPrecendence);
        query.first();
    }

    return await query;
};

export const createCustomer = async (data) => {};

export const changePrecedence = async (data) => {};
