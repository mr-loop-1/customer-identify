import { getCustomerById, identifyCustomer } from "../data/index";
import { ICustomer, LinkPrecedenceEnum } from "../interfaces/index";

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

export const checkPairTogether = async (
    primaryCustomer: ICustomer,
    phoneNumber: string,
    email: string
): Promise<boolean> => {
    if (
        primaryCustomer.email == email &&
        primaryCustomer.phoneNumber == phoneNumber
    ) {
        return true;
    }
    const results = await identifyCustomer(primaryCustomer.id, true);
    const exists = results.find((customer) => {
        return (
            customer.pairEmail == email &&
            customer.pairPhoneNumber == phoneNumber
        );
    });
    return exists ? true : false;
};
