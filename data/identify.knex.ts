import { knex } from "../database";
import { ICustomer, LinkPrecedenceEnum } from "../interfaces/index";

export const identifyCustomer = async (
    primaryId: number
): Promise<ICustomer[]> => {
    const query = knex
        .select("mainCustomer.*", "linkCustomer.id AS secondaryId")
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
