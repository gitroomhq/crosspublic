import {IsString} from "class-validator";
import {IdStringValidator} from "./id.string.validator";

export class CategoryStringValidator extends IdStringValidator {
    @IsString()
    category: string;
}
