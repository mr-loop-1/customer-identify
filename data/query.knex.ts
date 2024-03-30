import { knex } from "../database";
import {
    ICustomer,
    ICustomerInsert,
    LinkPrecedenceEnum,
} from "../interfaces/index";

export const getCustomer = async (
    propName: string,
    value: any
): Promise<ICustomer | undefined> => {
    const query = knex<ICustomer>("customers");

    query.where(propName, value);

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
): Promise<number> => {
    const query = knex("customers");
    query.insert<number[]>(data);

    const customerId = await query;
    return customerId[0];
};
