import { JsonArray, JsonValue } from '@prisma/client/runtime/library';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  Validate,
} from 'class-validator';
import { DurationSessionType, SessionType } from '../entities/Session';
import { IsJsonOrDurationConstraint } from 'src/shared/validates/IsJsonOrDurationConstraint';

export class CreateSessionDto {
  @IsDateString()
  date?: string;

  @IsEnum(SessionType)
  @IsNotEmpty()
  typeSession: SessionType;

  @Validate(IsJsonOrDurationConstraint)
  duration: JsonValue | DurationSessionType;

  @IsArray()
  @IsNotEmpty()
  seriesInformation: JsonArray;
}
