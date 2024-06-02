import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { exercisesList } from './exercisesList';
import { readFileSync } from 'fs';
import { S3Service } from 'src/module/s3/s3.service';

@Injectable()
class MuscleExerciseSeed {
  constructor(private readonly prismaService: PrismaService) {}

  async seed() {
    const imagesSavedInS3: {
      url: string;
      key: string;
      nameMuscleGroup: string;
    }[] = [];
    const s3 = new S3Service();
    const prismaService = new PrismaService();
    for (const objMuscleGroup of exercisesList) {
      const nameMuscleGroup =
        objMuscleGroup.nameMuscleGroup.split('/')[1] === undefined
          ? objMuscleGroup.nameMuscleGroup
          : objMuscleGroup.nameMuscleGroup.split('/')[1];

      for (const objExercise of objMuscleGroup.exercises) {
        const splitFileName = objExercise.imagePath.split('\\')[7];
        const imageBuffer = readFileSync(objExercise.imagePath);

        const command = await s3.uploadFile({
          file: imageBuffer,
          fileName: splitFileName,
          muscleGroup: nameMuscleGroup,
        });

        imagesSavedInS3.push({
          url: command.url,
          key: command.Key,
          nameMuscleGroup,
        });

        objExercise.url = command.url;
      }
    }

    try {
      await prismaService.$transaction(async (tx) => {
        for (const objMuscleGroup of exercisesList) {
          const arrayMuscleGroupExercises = objMuscleGroup.exercises.map(
            (exercise) => ({
              media: exercise.url,
              name: exercise.name,
            }),
          );

          await tx.muscleGroup.create({
            data: {
              name: objMuscleGroup.nameMuscleGroup,
              exercises: {
                createMany: {
                  data: arrayMuscleGroupExercises,
                },
              },
            },
          });
        }
      });
    } catch (error) {
      console.error('Error occurred, rolling back S3 uploads:', error);
      for (const image of imagesSavedInS3) {
        await s3.deleteFile({
          fileName: image.key,
          muscleGroup: image.nameMuscleGroup,
        });
      }
      throw error;
    }
  }

  async verifyIfSeedIsCreated() {
    const countMuscleGroup = await this.prismaService.muscleGroup.count();
    if (!countMuscleGroup) {
      await this.seed();
      console.log('seed was executed!');
    }
  }
}

export { MuscleExerciseSeed };
