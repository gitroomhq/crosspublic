import {IsString, MinLength} from "class-validator";

export class CreateCategoryValidator {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  editor: string;
}
