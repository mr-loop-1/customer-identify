import { createCustomer, getCustomer } from "../data/index";
import { IRequest, LinkPrecedenceEnum } from "../interfaces/index";
import { checkPairTogether, getPrimaryCustomer, getPrimaryId } from "./utils";
import handleDivergingPair from "./handleDivergingPair";

const handlePair = async (
    inputs: IRequest & { phoneNumber: number; email: string }
): Promise<number | undefined> => {
    console.log("🚀 ~ handlePair ~ inputs:", inputs);
    const phoneMatchCustomer = await getCustomer(
        "phoneNumber",
        inputs.phoneNumber
    );
    const emailMatchCustomer = await getCustomer("email", inputs.email);
    console.log("🚀 ~ emailMatchCustomer:", emailMatchCustomer);
    console.log("🚀 ~ phoneMatchCustomer:", phoneMatchCustomer);

    let primaryId;

    if (phoneMatchCustomer && emailMatchCustomer) {
        const customer1 = await getPrimaryCustomer(phoneMatchCustomer),
            customer2 = await getPrimaryCustomer(emailMatchCustomer);
        if (customer1.id !== customer2.id) {
            primaryId = await handleDivergingPair(customer1, customer2);
        } else {
            // const hasPairTogether = await checkPairTogether(
            //     customer1,
            //     inputs.phoneNumber,
            //     inputs.email
            // );
            // if (hasPairTogether) {
            primaryId = customer1.id;
            // } else {
            //     const newCustomer = {
            //         phoneNumber: inputs.phoneNumber,
            //         email: inputs.email,
            //         linkedId: customer1.id,
            //         linkPrecedence: LinkPrecedenceEnum.secondary,
            //     };
            //     primaryId = await createCustomer(newCustomer);
            // }
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
        primaryId = await createCustomer(newCustomer);
    }

    return primaryId;
};

export default handlePair;
