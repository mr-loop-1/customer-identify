import { IsEmail, IsPhoneNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export default class RequestDTO {
    @IsPhoneNumber("IN", { message: "Invalid phone number" })
    @Transform(({ value }: { value: Number }) => {
        if (typeof value !== "number") {
            throw new Error("Phone number must be a number");
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
