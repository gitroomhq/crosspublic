import {IsIn} from "class-validator";

export class BillingSubscribeValidator {
  @IsIn(['MONTHLY', 'YEARLY'])
  period: 'MONTHLY' | 'YEARLY';

  @IsIn(['BASIC', 'PRO'])
  billing: 'BASIC' | 'PRO';
}
