const { getCustomer } = require("../data/query.knex");

exports.handleAll = (req, res, next) => {
    if (req.body.phoneNumber && req.body.email) {

        const doc = await getCustomer('phoneNumber', req.body.phoneNumber, 'primary');

        const doc2 = await getCustomer('email', req.body.email, 'primary');

        if(doc.id === doc2.id) {
            return res.json('both are same');
        }
    }
    else if(req.body.phoneNumber) {

    }
    else {

    }

};
