import { getCustomer, getCustomerById, identifyCustomer } from "../data/index";
import handleOne from "../services/handleOne";
import handlePair from "../services/handlePair";
import transform from "../transformer/index";

const controller = async (req, res, next) => {
    let results, primaryId, primary;
    console.log("here2");
    try {
        if (req.body?.phoneNumber && req.body?.email) {
            primaryId = await handlePair(req.body);
            //? Not fetching data above since concurrent requests could render it outdated
        } else if (req.body?.phoneNumber) {
            primaryId = await handleOne("phoneNumber", req.body);
        } else {
            primaryId = await handleOne("email", req.body);
        }
        results = primaryId && (await identifyCustomer(primaryId));
        console.log("🚀 ~ controller ~ primaryId:", primaryId);
        primary = primaryId && (await getCustomerById(primaryId));
        console.log("🚀 ~ controller ~ results:", results);
        // data = transform(results);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong!", errors: err });
    }
    const data = transform(primary, results);
    console.log("🚀 ~ controller ~ data:", data);
    res.status(200).json(data);
};

export default controller;
