import { createCustomer, getCustomer } from "../data/index";
import { LinkPrecedenceEnum } from "../interfaces/index";

const handleOne = async (propName, inputs): Promise<void> => {
    console.log("🚀 ~ handleOne ~ inputs:", inputs);
    console.log("🚀 ~ handleOne ~ propName:", propName);
    const matchCustomer = await getCustomer(propName, inputs[propName]);
    console.log("🚀 ~ handleOne ~ matchCustomer:", matchCustomer);
    if (!matchCustomer) {
        console.log("heree---------------------------");
        const newCustomer = {
            [propName]: inputs[propName],
            linkPrecedence: LinkPrecedenceEnum.primary,
        };
        await createCustomer(newCustomer);
    }
    // return matchCustomer;
    return Promise.resolve();
};

export default handleOne;
