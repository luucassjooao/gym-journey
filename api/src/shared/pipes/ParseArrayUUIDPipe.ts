import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseArrayUUIDPipe implements PipeTransform<string, string[]> {
  transform(value: string): string[] {
    if (!value) {
      return [];
    }

    const uuids = value.split(',');

    // Validate that each element in the array is a valid UUID
    if (
      uuids.some(
        (uuid) =>
          !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
            uuid,
          ),
      )
    ) {
      throw new BadRequestException('Invalid UUID format');
    }

    return uuids;
  }
}
