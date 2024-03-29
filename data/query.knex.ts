import { knex } from "../database";
import { ICustomer, ICustomerInsert } from "../interfaces";

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

    return await query.first();
};

export const createCustomer = async (data: ICustomerInsert): Promise<void> => {
    const query = knex<ICustomer>("customers");
    query.insert(data);
    await query;

    return Promise.resolve();
};
