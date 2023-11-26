import {IsOptional, IsString} from "class-validator";

export class DeleteCategoryValidator {
  @IsString()
  @IsOptional()
  category: string;
}
