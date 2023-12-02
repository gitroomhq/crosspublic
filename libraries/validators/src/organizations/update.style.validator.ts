import {IsDefined, IsOptional, IsString, MinLength, registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint({ async: false })
class IsHexColorConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(hexColor: unknown) {
    return typeof hexColor === 'string' && /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(hexColor);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage() {
    return 'Text ($value) is not a valid hex color';
  }
}

export function IsHexColor(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsHexColorConstraint,
    });
  };
}

export class UpdateStyleValidator {
  @IsDefined()
  @IsString()
  @MinLength(1)
  name: string;

  @IsDefined()
  @IsString()
  @IsHexColor()
  topBarColor: string;

  @IsDefined()
  @IsString()
  @IsHexColor()
  topBarTextColor: string;

  @IsDefined()
  @IsString()
  @IsHexColor()
  backgroundColor: string;

  @IsDefined()
  @IsString()
  @IsHexColor()
  pageTextColor: string;

  @IsDefined()
  @IsString()
  @IsHexColor()
  pageBlockColor: string;

  @IsString()
  @IsOptional()
  brandingText: string;
}
