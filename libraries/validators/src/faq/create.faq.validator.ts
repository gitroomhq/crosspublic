import {IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateFaqValidator {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  question: string;

  @IsString()
  @MinLength(3)
  answer: string;

  @IsString()
  categoryId: string;
}
