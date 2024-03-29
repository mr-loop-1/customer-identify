import { knex } from "../database";
import { ICustomer } from "../interfaces";

export const getCustomer = async (
    propName: string,
    value: any,
    linkPrecendence: string
): Promise<ICustomer | undefined> => {
    const query = knex<ICustomer>("customers");

    query.where(propName, value);

    if (linkPrecendence) {
        query.where("linkPrecedence", linkPrecendence);
    }

    const customer = await query.first();

    return customer;
};

export const createCustomer = async (data) => {
    const query = knex<ICustomer>("customers");

    if (linkPrecendence) {
        query.where("linkPrecedence", linkPrecendence);
    }

    const customer = await query.first();

    return customer;
};

export const changePrecedence = async (data) => {};
