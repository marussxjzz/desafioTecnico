import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsCustomDateConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const regexFullYear = /^\d{2}\/\d{2}\/\d{4}$/;
    const regexShortYear = /^\d{2}\/\d{2}\/\d{2}$/;

    return regexFullYear.test(value) || regexShortYear.test(value);
  }

  defaultMessage(): string {
    return 'Fecha debe seguir el formato DD/MM/AAAA o DD/MM/AA';
  }
}

export function IsCustomDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCustomDateConstraint,
    });
  };
}
