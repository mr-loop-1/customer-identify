import { identifyCustomer } from "../data/index";
import handleOne from "../services/handleOne";
import handlePair from "../services/handlePair";
import transform from "../transformer/index";

const controller = async (req, res, next) => {
    let results, data;
    console.log("here2");
    try {
        if (req.body?.phoneNumber && req.body?.email) {
            await handlePair(req.body);
            //? Not fetching data above since concurrent requests could render it outdated
            results = await identifyCustomer(
                "phoneNumber",
                req.body.phoneNumber
            );
        } else if (req.body?.phoneNumber) {
            await handleOne("phoneNumber", req.body);
            results = await identifyCustomer(
                "phoneNumber",
                req.body.phoneNumber
            );
        } else {
            console.log("here3");
            await handleOne("email", req.body);
            console.log("here4");
            results = await identifyCustomer("email", req.body.email);
        }
        console.log(results);
        // data = transform(results);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong!", errors: err });
    }

    res.status(200).json();
};

export default controller;
