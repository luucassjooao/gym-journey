import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import * as mime from 'mime-types';

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const CLOUDFRONT_ACCESS = process.env.CLOUDFRONT_ACCESS;

interface IProps {
  muscleGroup: string;
  fileName: string;
  file: Buffer;
}

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: BUCKET_REGION,
    });
  }

  async uploadFile({ muscleGroup, fileName, file }: IProps) {
    try {
      const contentType = mime.lookup(fileName) || 'application/octet-stream';
      const Key = `${muscleGroup}/${fileName}`;

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key,
        Body: file,
        ContentType: contentType,
      });
      await this.s3Client.send(command);

      return {
        url: `${CLOUDFRONT_ACCESS}/${Key}`,
        Key,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async deleteFile({ fileName, muscleGroup }: Omit<IProps, 'file'>) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${muscleGroup}/${fileName}`,
      });
      await this.s3Client.send(command);
    } catch (e) {
      console.log(e);
    }
  }
}
