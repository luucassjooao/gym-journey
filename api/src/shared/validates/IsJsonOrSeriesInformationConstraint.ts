import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isJsonOrDuration', async: false })
export class IsJsonOrSeriesInformationConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any) {
    if (typeof value === 'string') {
      try {
        const parsedValue = JSON.parse(value);
        if (
          typeof parsedValue === 'object' &&
          parsedValue.exerciseId &&
          parsedValue.series
        ) {
          return true;
        }
      } catch (e) {
        return e;
      }
    }

    if (typeof value === 'object' && value.exerciseId && value.series) {
      return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a JSON string or a valid SeriesInformationType object`;
  }
}
