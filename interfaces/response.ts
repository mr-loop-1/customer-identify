export interface IResponse {
    contact: {
        primaryContatctId: number;
        phoneNumbers: (number | undefined)[];
        emails: (string | undefined)[];
        secondaryContactIds: (number | undefined)[];
    };
}
