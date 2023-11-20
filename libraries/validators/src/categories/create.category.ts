import {IsString, MinLength} from "class-validator";

export class CreateCategory {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  editor: string;
}
