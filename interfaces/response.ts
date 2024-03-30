export interface IResponse {
    contact: {
        primaryContatctId: number;
        phoneNumbers: (string | undefined)[];
        emails: (string | undefined)[];
        secondaryContactIds: (number | undefined)[];
    };
}
