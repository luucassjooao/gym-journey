import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { MuscleGroupRepository } from 'src/shared/database/repositories/muscle-group.repositories';
import { SessionRepository } from 'src/shared/database/repositories/session.repositories';
import { ExerciseRepository } from 'src/shared/database/repositories/exercise.repositories';
import { SeriesInformationType } from './entities/Session';

@Injectable()
export class SessionsService {
  constructor(
    private readonly muscleGroupRepo: MuscleGroupRepository,
    private readonly sessionRepo: SessionRepository,
    private readonly exerciseRepo: ExerciseRepository,
  ) {}

  async create(
    userId: string,
    muscleGroupId: string[],
    createSessionDto: CreateSessionDto,
  ) {
    const { date, duration, seriesInformation, typeSession } = createSessionDto;
    /**
     * seriesInformation
     * [{
     *  x: {},
     *  y: {}
     * }]
     */

    const findMusclesGroupsIds = await this.muscleGroupRepo.findMany({
      where: {
        id: {
          in: muscleGroupId,
        },
      },
    });
    if (!findMusclesGroupsIds)
      throw new NotFoundException('Some muscle group is not exist!');

    return this.sessionRepo.create({
      data: {
        date: date || new Date(),
        duration: duration || { start: new Date(), end: new Date() },
        typeSession,
        seriesinformation: seriesInformation,
        targetedMuscles: {
          connect: findMusclesGroupsIds.map(({ id }) => ({
            id,
          })),
        },
        userId,
      },
      select: {
        date: true,
        id: true,
        duration: true,
        seriesinformation: true,
        targetedMuscles: true,
        typeSession: true,
      },
    });
  }

  async findAllMyOwnSessions(userId: string) {
    return this.sessionRepo.findMany({
      where: {
        userId,
      },
      include: {
        targetedMuscles: true,
      },
    });
  }

  async findOne(id: string) {
    return this.sessionRepo.findUnique({
      where: {
        id,
      },
      include: {
        targetedMuscles: true,
      },
    });
  }

  async updateSeriesInformation(
    userId: string,
    id: string,
    { seriesInformation }: UpdateSessionDto,
  ) {
    const [, findSessionById, findExerciseIdInSeriesInformation] =
      await Promise.all([
        this.validate(userId, id),
        this.sessionRepo
          .findUnique({
            where: {
              id,
            },
          })
          .catch(() => {
            throw new NotFoundException('This session is not registered!');
          }),
        this.exerciseRepo
          .findUnique({
            where: {
              id: (seriesInformation as unknown as { exerciseId: string })
                .exerciseId,
            },
          })
          .catch(() => {
            throw new NotFoundException('This exercise is not found!');
          }),
      ]);

    const newEndSessionHour = {
      start: (findSessionById.duration as unknown as { start: Date }).start,
      end: new Date(),
    };

    const { exerciseId, newExercise, series } =
      seriesInformation as unknown as SeriesInformationType;

    if (newExercise) {
      return this.sessionRepo.update({
        where: {
          id,
        },
        data: {
          seriesinformation: {
            push: {
              [findExerciseIdInSeriesInformation.name]: [
                { ...series, exerciseId },
              ],
            },
          },
          duration: newEndSessionHour,
        },
      });
    }

    const pushOthersExercise = [];
    let updateSerieInformation = {};

    for (const dataObject of findSessionById.seriesinformation) {
      for (const key in dataObject as any) {
        if (key !== findExerciseIdInSeriesInformation.name) {
          pushOthersExercise.push(dataObject);
        }
        if (Object.hasOwnProperty.call(dataObject, key)) {
          for (const exerciseObj of dataObject[key]) {
            const name = key;
            if (exerciseId === exerciseObj.exerciseId) {
              updateSerieInformation = {
                [name]: [exerciseObj, series],
              };
            }
          }
        }
      }
    }

    return this.sessionRepo.update({
      where: {
        id,
      },
      data: {
        seriesinformation: [pushOthersExercise, updateSerieInformation],
        duration: newEndSessionHour,
      },
    });
  }

  async validate(userId: string, sessionId: string) {
    const isOwer = await this.sessionRepo.findUnique({
      where: { id: sessionId, userId },
    });

    if (!isOwer) {
      throw new NotFoundException('Session Not found!');
    }
  }
}
