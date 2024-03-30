import {
    IsEmail,
    IsPhoneNumber,
    IsOptional,
    IsString,
    ValidationError,
} from "class-validator";
import { Transform } from "class-transformer";

export default class RequestDTO {
    @IsPhoneNumber("IN", { message: "Invalid Indian phone number" })
    @Transform(({ value }: { value: Number }) => {
        if (typeof value !== "number") {
            const error = new ValidationError();
            error.property = "phoneNumber";
            error.constraints = {
                transformError: "phoneNumber must be a number",
            };
            throw error;
        }
        return String(value);
    })
    // @IsNumber()
    @IsOptional()
    phoneNumber: string;

    @IsEmail()
    @IsString()
    @IsOptional()
    email: string;
}
