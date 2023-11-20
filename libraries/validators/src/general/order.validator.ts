import {Type} from "class-transformer";
import {IsArray, IsNumber, IsString} from "class-validator";

export class OrderValidator {
  @IsArray()
  @Type(() => OrderListValidator)
  order: OrderListValidator[];
}

export class OrderListValidator {
  @IsString()
  id: string;

  @IsNumber()
  order: number;
}
