import { knex } from "../database";
import { ICustomer } from "../interfaces";

export const getCustomer = async (
    propName,
    value,
    linkPrecendence
): Promise<ICustomer | undefined> => {
    const query = knex<ICustomer>("customers");

    query.where(propName, value);

    if (linkPrecendence) {
        query.where("linkPrecedence", linkPrecendence);
        query.first();
    }

    const customer = await query.first();

    return customer;
};

export const createCustomer = async (data) => {};

export const changePrecedence = async (data) => {};
