import { identifyCustomer } from "../data/index";
import handleOne from "../services/handleOne";
import handlePair from "../services/handlePair";
import transform from "../transformer/index";

const controller = async (req, res, next) => {
    let results, data;
    try {
        if (req.body?.phoneNumber && req.body?.email) {
            await handlePair(req.body);
            //? Not fetching data above since concurrent requests could render it outdated
            results = await identifyCustomer(
                "phoneNumber",
                req.body?.phoneNumber
            );
        } else if (req.body?.phoneNumber) {
            await handleOne("phoneNumber", req.body.phoneNumber);
            results = await identifyCustomer(
                "phoneNumber",
                req.body?.phoneNumber
            );
        } else {
            await handleOne("email", req.body.email);
            results = await identifyCustomer("email", req.body?.email);
        }
        console.log(results);
        // data = transform(results);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong!" });
    }

    res.status(200).json();
};

export default controller;
