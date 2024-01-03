import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isJsonOrDuration', async: false })
export class IsJsonOrDurationConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any) {
    if (typeof value === 'string') {
      try {
        const parsedValue = JSON.parse(value);
        if (
          typeof parsedValue === 'object' &&
          parsedValue.start &&
          parsedValue.end
        ) {
          return true;
        }
      } catch (e) {
        return e;
      }
    }

    if (typeof value === 'object' && value.start && value.end) {
      return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a JSON string or a valid DurationSessionType object`;
  }
}
