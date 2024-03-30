import { createCustomer, getCustomer } from "../data/index";
import { IRequest, LinkPrecedenceEnum } from "../interfaces/index";
import { getPrimaryCustomer, getPrimaryId } from "./getPrimaryCustomer";
import handleDivergingPair from "./handleDivergingPair";

const handlePair = async (inputs: IRequest): Promise<any> => {
    console.log("🚀 ~ handlePair ~ inputs:", inputs);
    const phoneMatchCustomer = await getCustomer(
        "phoneNumber",
        inputs.phoneNumber
    );
    const emailMatchCustomer = await getCustomer("email", inputs.email);

    let primaryId;

    if (phoneMatchCustomer && emailMatchCustomer) {
        const customer1 = await getPrimaryCustomer(phoneMatchCustomer),
            customer2 = await getPrimaryCustomer(emailMatchCustomer);
        if (customer1.id !== customer2.id) {
            //* convert younger into secondary
            //* chain others too into that - relink chain
            primaryId = await handleDivergingPair(customer1, customer2);
        }
        primaryId = customer1?.id;
    } else if (phoneMatchCustomer) {
        primaryId = getPrimaryId(phoneMatchCustomer);
        const newCustomer = {
            phoneNumber: inputs.phoneNumber,
            email: inputs.email,
            linkedId: primaryId,
            linkPrecedence: LinkPrecedenceEnum.secondary,
        };
        await createCustomer(newCustomer);
    } else if (emailMatchCustomer) {
        primaryId = getPrimaryId(emailMatchCustomer);
        const newCustomer = {
            phoneNumber: inputs.phoneNumber,
            email: inputs.email,
            linkedId: primaryId,
            linkPrecedence: LinkPrecedenceEnum.secondary,
        };
        await createCustomer(newCustomer);
    } else {
        const newCustomer = {
            phoneNumber: inputs.phoneNumber,
            email: inputs.email,
            linkPrecedence: LinkPrecedenceEnum.primary,
        };
        const customer = await createCustomer(newCustomer);
        primaryId = customer?.id;
    }

    return primaryId;
};

export default handlePair;
