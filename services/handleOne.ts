import { createCustomer, getCustomer } from "../data/index";
import { LinkPrecedenceEnum } from "../interfaces/index";
import { getPrimaryId } from "./utils";

const handleOne = async (propName, inputs): Promise<number | undefined> => {
    const matchCustomer = await getCustomer(propName, inputs[propName]);
    if (matchCustomer) {
        return getPrimaryId(matchCustomer);
    }
    const newCustomer = {
        [propName]: inputs[propName],
        linkPrecedence: LinkPrecedenceEnum.primary,
    };
    const customerId = await createCustomer(newCustomer);

    return customerId;
};

export default handleOne;
