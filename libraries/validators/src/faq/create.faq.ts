import {IsString, MinLength} from "class-validator";

export class CreateFaq {
  @IsString()
  @MinLength(3)
  question: string;

  @IsString()
  @MinLength(3)
  answer: string;

  @IsString()
  categoryId: string;
}
