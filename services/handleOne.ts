import { createCustomer, getCustomer } from "../data/index";
import { LinkPrecedenceEnum } from "../interfaces/index";

const handleOne = async (propName, inputs): Promise<void> => {
    const matchCustomer = await getCustomer(propName, inputs[propName]);
    if (!matchCustomer) {
        const newCustomer = {
            [propName]: inputs[propName],
            linkPrecedence: LinkPrecedenceEnum.primary,
        };
        await createCustomer(newCustomer);
    }
    return;
};

export default handleOne;
