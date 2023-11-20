import {IsString} from "class-validator";

export class IdStringValidator {
    @IsString()
    id: string;
}
