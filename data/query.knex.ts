import { knex } from "../database";
import {
    ICustomer,
    ICustomerInsert,
    LinkPrecedenceEnum,
} from "../interfaces/index";

export const getCustomer = async (
    propName: string,
    value: any
    // linkPrecendence: string
): Promise<ICustomer | undefined> => {
    const query = knex<ICustomer>("customers");

    query
        .where(propName, value)
        .where("linkPrecedence", LinkPrecedenceEnum.primary);

    return await query.first();
};

export const getCustomerById = async (
    id: any
): Promise<ICustomer | undefined> => {
    const query = knex<ICustomer>("customers");

    query.where("id", id);

    return await query.first();
};

export const createCustomer = async (
    data: ICustomerInsert
): Promise<ICustomer | undefined> => {
    const query = knex<ICustomer>("customers");
    query.insert(data).onConflict().ignore();

    return await query.first();
};
