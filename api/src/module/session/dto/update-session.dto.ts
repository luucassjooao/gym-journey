import { JsonValue } from '@prisma/client/runtime/library';
import { Validate } from 'class-validator';
import { IsJsonOrSeriesInformationConstraint } from 'src/shared/validates/IsJsonOrSeriesInformationConstraint';

export class UpdateSessionDto {
  @Validate(IsJsonOrSeriesInformationConstraint)
  seriesInformation: JsonValue;
}
