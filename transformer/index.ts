const transform = (primary, results) => {
    const emails = results
        ? [
              ...results.map((customer) => {
                  return customer.pairEmail;
              }),
              primary.email,
          ]
        : [primary.email];
    const phoneNumbers = results
        ? [
              ...results.map((customer) => {
                  return customer.pairPhoneNumber;
              }),
              primary.phoneNumber,
          ]
        : [primary.phoneNumber];
    const ids = results
        ? results.map((customer) => {
              return customer.secondaryId;
          })
        : [];

    return {
        contact: {
            primaryContatctId: primary.id,
            existingEmail: [...new Set(emails)].filter(
                (email) => email != null
            ),
            phoneNumbers: [...new Set(phoneNumbers)].filter(
                (phone) => phone != null
            ),
            secondaryContactIds: ids.filter((id) => id != null),
        },
    };
};

export default transform;
