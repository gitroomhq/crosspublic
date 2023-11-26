import {Type} from "class-transformer";
import {IsArray, IsNumber, IsString, ValidateNested} from "class-validator";

export class OrderValidator {
  @IsArray()
  @ValidateNested()
  @Type(() => OrderListValidator)
  order: OrderListValidator[];
}

export class OrderListValidator {
  @IsString()
  id: string;

  @IsNumber()
  order: number;
}
