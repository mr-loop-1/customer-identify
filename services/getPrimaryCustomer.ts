import { getCustomer, getCustomerById } from "data";
import { ICustomer, LinkPrecedenceEnum } from "interfaces";

export const getPrimaryCustomer = async (
    customer: ICustomer
): Promise<ICustomer> => {
    if (customer.linkPrecedence == LinkPrecedenceEnum.primary) {
        return customer;
    }
    const primaryCustomer = await getCustomerById(customer.linkedId);
    return primaryCustomer || customer;
};

export const getPrimaryId = (customer: ICustomer): number => {
    if (customer.linkPrecedence == LinkPrecedenceEnum.primary) {
        return customer.id;
    }
    return customer.linkedId;
};
