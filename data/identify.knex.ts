import { knex } from "../database";
import {
    ICustomer,
    ICustomerFull,
    LinkPrecedenceEnum,
} from "../interfaces/index";

export const identifyCustomer = async (
    primaryId: number,
    includePair: boolean = false
): Promise<ICustomerFull[]> => {
    const query = knex.select(
        "mainCustomer.*",
        "linkCustomer.id AS secondaryId"
    );

    if (includePair) {
        query.select(
            "linkCustomer.email AS pairEmail",
            "linkCustomer.phoneNumber AS pairPhoneNumber"
        );
    }

    query
        .from("customers AS mainCustomer")
        .where(`mainCustomer.id`, primaryId)
        .where("mainCustomer.linkPrecedence", LinkPrecedenceEnum.primary) //* for safety
        .leftJoin(
            "customers AS linkCustomer",
            "mainCustomer.id",
            "linkCustomer.linkedId"
        );
    return await query;
};
