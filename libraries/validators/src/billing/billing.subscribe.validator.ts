import {IsIn} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BillingSubscribeValidator {
  @ApiProperty()
  @IsIn(['MONTHLY', 'YEARLY'])
  period: 'MONTHLY' | 'YEARLY';

  @IsIn(['BASIC', 'PRO'])
  billing: 'BASIC' | 'PRO';
}
