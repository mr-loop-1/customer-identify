import { ICustomer, ICustomerFull } from "interfaces";
import { IResponse } from "interfaces/response";

const transform = (
    primary: ICustomer,
    results: ICustomerFull[] | undefined
): IResponse => {
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
            emails: [...new Set(emails)].filter(
                (email) => email != null || email != undefined
            ),
            phoneNumbers: [...new Set(phoneNumbers)].filter(
                (phone) => phone != null || phone != undefined
            ),
            secondaryContactIds: ids.filter(
                (id) => id != null || id != undefined
            ),
        },
    };
};

export default transform;
