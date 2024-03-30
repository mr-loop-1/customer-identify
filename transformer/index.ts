const transform = async (results) => {
    return {
        id: results[0].mainCustomer.id,
    };
};

export default transform;
