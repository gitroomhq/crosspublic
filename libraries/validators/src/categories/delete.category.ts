import {IsOptional, IsString} from "class-validator";

export class DeleteCategory {
  @IsString()
  @IsOptional()
  category: string;
}
