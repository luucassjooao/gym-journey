import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
class MuscleExerciseSeed {
  constructor(private readonly prismaService: PrismaService) {}

  private async seed() {
    await Promise.all([
      // chest
      await this.prismaService.muscleGroup.create({
        data: {
          name: 'Pectorais/Pectorals',
          exercises: {
            createMany: {
              data: [
                { name: 'Supino Reto/Bench Press' },
                { name: 'Supino Inclinado/Incline Bench Press' },
                { name: 'Supino Declinado/Decline Bench Press' },
                { name: 'Flexão de Braços/Push-up' },
                { name: 'Crossover/Cable Crossover' },
                { name: 'Pullover/Pullover' },
                { name: 'Fly no Cross Machine/Fly no Cross Machine' },
                { name: 'Apoio de Peito na Máquina/Machine Chest Press' },
                { name: 'Press Inclinado com Halteres/Incline Dumbbell Press' },
                {
                  name: 'Flexão de Braços com Pés Elevados/Feet-Elevated Push-up',
                },
                { name: 'Peck Deck/Butterfly' },
                { name: 'Mergulho entre Bancos/Dips' },
                { name: 'Flexão Declinada/Decline Push-up' },
                {
                  name: 'Apoio de Peito Inclinado na Máquina/Incline Machine Press',
                },
                {
                  name: 'Supino com Halteres no Banco Inclinado/Incline Bench Dumbbell Press',
                },
                {
                  name: 'Fly com Halteres no Banco Inclinado/Incline Dumbbell Fly',
                },
                { name: 'Fly com Halteres no Banco Plano/Flat Dumbbell Fly' },
                {
                  name: 'Flexão de Braços com Peso Adicional/Weighted Push-up',
                },
                { name: 'Flexão de Braços em Máquina/Machine Push-up' },
                {
                  name: 'Cross Over com Halteres/Cable Crossover with Dumbbells',
                },
              ],
            },
          },
        },
      }),
      // back
      await this.prismaService.muscleGroup.create({
        data: {
          name: 'Costas/Back',
          exercises: {
            createMany: {
              data: [
                { name: 'Barra Fixa/Pull-up' },
                { name: 'Puxada Alta/Lat Pulldown' },
                { name: 'Remada Curvada/Bent Over Row' },
                { name: 'Deadlift/Levantamento Terra' },
                { name: 'Pull-down/Seated Cable Row' },
                { name: 'Pull-down com Triângulo/Triangle Pull-down' },
                { name: 'Barra T/T-bar Row' },
                {
                  name: 'Remada Unilateral com Halter/Single-arm Dumbbell Row',
                },
                { name: 'Pull-over com Halter/Dumbbell Pullover' },
                { name: 'Pulldown na Máquina/Machine Lat Pulldown' },
                { name: 'Remada Cavalinho/T-bar Row' },
                { name: 'Remada Baixa/Low Row' },
                { name: 'Hiperextensão Lombar/Hyperextension' },
                { name: 'Pull-down Invertido/Reverse Grip Lat Pulldown' },
                {
                  name: 'Pulldown com Pegada Neutra/Neutral Grip Lat Pulldown',
                },
                { name: 'Barra Fixa Fechada/Close-grip Pull-up' },
                { name: 'Remada Unilateral em Máquina/Machine Single-arm Row' },
                {
                  name: 'Barra Fixa com Pegada Supinada/Underhand Grip Pull-up',
                },
                { name: 'Pulldown com Pegada Ampla/Wide Grip Lat Pulldown' },
                { name: 'Remada na Máquina/Machine Row' },
              ],
            },
          },
        },
      }),
      // shoulders
      await this.prismaService.muscleGroup.create({
        data: {
          name: 'Ombros/Shoulders',
          exercises: {
            createMany: {
              data: [
                { name: 'Desenvolvimento com Barra/Barbell Shoulder Press' },
                {
                  name: 'Desenvolvimento com Halteres/Dumbbell Shoulder Press',
                },
                { name: 'Elevação Lateral/Lateral Raise' },
                { name: 'Elevação Frontal/Front Raise' },
                { name: 'Desenvolvimento Arnold/Arnold Press' },
                { name: 'Encolhimento de Ombros/Shoulder Shrug' },
                { name: 'Desenvolvimento na Máquina/Machine Shoulder Press' },
                { name: 'Elevação Lateral Invertida/Inverted Lateral Raise' },
                { name: 'Elevação Lateral na Máquina/Machine Lateral Raise' },
                {
                  name: 'Desenvolvimento com Barra Sentado/Seated Barbell Shoulder Press',
                },
                { name: 'Elevação Frontal com Barra/Barbell Front Raise' },
                { name: 'Elevação Frontal com Cabos/Cable Front Raise' },
                {
                  name: 'Desenvolvimento com Halteres Sentado/Seated Dumbbell Shoulder Press',
                },
                {
                  name: 'Elevação Lateral com Halteres/Dumbbell Lateral Raise',
                },
                { name: 'Elevação Frontal Alternada/Alternating Front Raise' },
                {
                  name: 'Desenvolvimento com Pegada Neutra/Neutral Grip Shoulder Press',
                },
                {
                  name: 'Encolhimento de Ombros com Halteres/Dumbbell Shoulder Shrug',
                },
                {
                  name: 'Elevação Lateral Unilateral/Unilateral Lateral Raise',
                },
                { name: 'Desenvolvimento em Pé/Standing Shoulder Press' },
                { name: 'Elevação Lateral Inclinada/Incline Lateral Raise' },
              ],
            },
          },
        },
      }),
      // biceps
      await this.prismaService.muscleGroup.create({
        data: {
          name: 'Biceps',
          exercises: {
            createMany: {
              data: [
                { name: 'Rosca Direta/Barbell Curl' },
                { name: 'Rosca Martelo/Hammer Curl' },
                { name: 'Rosca Concentrada/Concentration Curl' },
                { name: 'Rosca 21/21s' },
                { name: 'Rosca Scott/Scott Curl' },
                { name: 'Rosca Inversa/Reverse Curl' },
                { name: 'Rosca Alternada/Alternate Curl' },
                { name: 'Rosca com Corda/Rope Curl' },
                { name: 'Rosca com Barra W/W-bar Curl' },
                { name: 'Rosca Direta Alternada/Alternate Barbell Curl' },
              ],
            },
          },
        },
      }),
      // triceps
      await this.prismaService.muscleGroup.create({
        data: {
          name: 'Triceps',
          exercises: {
            createMany: {
              data: [
                { name: 'Tríceps Testa/Skull Crushers' },
                { name: 'Tríceps Pulley/Tricep Pushdown' },
                { name: 'Supino Fechado/Close-Grip Bench Press' },
                { name: 'Tríceps Mergulho em Máquina/Machine Tricep Dip' },
                { name: 'Tríceps Pulley com Corda/Rope Tricep Pushdown' },
                {
                  name: 'Tríceps Pulley com Barra Reta/Straight Bar Tricep Pushdown',
                },
                { name: 'Tríceps Coice com Halter/Dumbbell Tricep Kickback' },
                {
                  name: 'Tríceps Coice com Halter Unilateral/Unilateral Dumbbell Tricep Kickback',
                },
                {
                  name: 'Supino Fechado na Máquina/Machine Close-Grip Bench Press',
                },
                {
                  name: 'Supino Fechado com Halteres/Dumbbell Close-Grip Bench Press',
                },
                // ... and all other exercises
              ],
            },
          },
        },
      }),
      // quads
      await this.prismaService.muscleGroup.create({
        data: {
          name: 'Quadríceps/Quadriceps',
          exercises: {
            createMany: {
              data: [
                { name: 'Agachamento/Squat' },
                { name: 'Agachamento com Barra/Barbell Squat' },
                { name: 'Leg Press' },
                { name: 'Avanço/Lunge' },
                { name: 'Avanço com Barra/Barbell Lunge' },
                { name: 'Agachamento Frontal/Front Squat' },
                { name: 'Agachamento Sumô/Sumo Squat' },
                { name: 'Agachamento Hack/Hack Squat' },
                { name: 'Prensa 45°/45-Degree Leg Press' },
                { name: 'Cadeira Extensora/Leg Extension Machine' },
                { name: 'Agachamento Bulgáro/Bulgarian Split Squat' },
                { name: 'Agachamento com Salto/Jump Squat' },
                { name: 'Salto com Peso/Weighted Jump' },
                { name: 'Agachamento com Pausa/Pause Squat' },
                { name: 'Agachamento Unilateral/Unilateral Squat' },
                { name: 'Salto na Caixa/Box Jump' },
                { name: 'Agachamento com Salto Lateral/Lateral Jump Squat' },
                { name: 'Agachamento em Uma Perna/Single-leg Squat' },
                { name: 'Agachamento com Bandas/Banded Squat' },
                { name: 'Agachamento Smith Machine/Smith Machine Squat' },
              ],
            },
          },
        },
      }),
      // hammies
      await this.prismaService.muscleGroup.create({
        data: {
          name: 'Isquiotibiais/Hamstrings',
          exercises: {
            createMany: {
              data: [
                { name: 'Stiff' },
                { name: 'Levantamento Terra Romeno/Romanian Deadlift' },
                { name: 'Flexão de Pernas/Leg Curl' },
                { name: 'Good Morning' },
                { name: 'Stiff com Barra/Barbell Stiff-legged Deadlift' },
                { name: 'Afundo com Barra/Barbell Deadlift' },
                { name: 'Ponte de Glúteos/Glute Bridge' },
                { name: 'Hip Thrust' },
                { name: 'Flexão de Pernas Unilateral/Single-leg Leg Curl' },
                { name: 'Flexão de Pernas Isolada/Isolated Leg Curl' },
                { name: 'Flexão de Pernas com Halter/Dumbbell Leg Curl' },
                { name: 'Flexão de Pernas em Máquina/Machine Leg Curl' },
                { name: 'Levantamento Terra Sumô/Sumo Deadlift' },
                { name: 'Good Morning com Barra/Barbell Good Morning' },
                { name: 'Levantamento Terra com Pausa/Pause Deadlift' },
                { name: 'Stiff Unilateral/Single-leg Stiff-legged Deadlift' },
                {
                  name: 'Levantamento Terra com Pegada Inversa/Reverse Grip Deadlift',
                },
                { name: 'Stiff com Halter/Dumbbell Stiff-legged Deadlift' },
                { name: 'Levantamento Terra com Peso/Weighted Deadlift' },
                { name: 'Flexão de Pernas com Barra/Barbell Leg Curl' },
              ],
            },
          },
        },
      }),
      // gluteos
      await this.prismaService.muscleGroup.create({
        data: {
          name: 'Glúteos/Glutes',
          exercises: {
            createMany: {
              data: [
                { name: 'Ponte de Glúteos/Glute Bridge' },
                { name: 'Hip Thrust' },
                { name: 'Elevação de Pernas no Cabo/Cable Leg Lift' },
                { name: 'Abdução de Quadril/Hip Abduction' },
                { name: 'Glute Kickback' },
                { name: 'Deadlift Romeno com Barra/Barbell Romanian Deadlift' },
                { name: 'Levantamento Terra Sumô/Sumo Deadlift' },
                { name: 'Agachamento Sumô/Sumo Squat' },
                { name: 'Agachamento Búlgaro/Bulgarian Split Squat' },
                { name: 'Deadlift com Pausa/Pause Deadlift' },
                { name: 'Ponte de Glúteos com Peso/Weighted Glute Bridge' },
                { name: 'Hip Thrust com Peso/Weighted Hip Thrust' },
                { name: 'Ponte de Glúteos Unilateral/Single-leg Glute Bridge' },
                { name: 'Hip Thrust Unilateral/Single-leg Hip Thrust' },
                { name: 'Deadlift com Pernas Retas/Straight Leg Deadlift' },
                { name: 'Agachamento com Salto Lateral/Lateral Jump Squat' },
                { name: 'Agachamento Smith Machine/Smith Machine Squat' },
                { name: 'Deadlift Isométrico/Isometric Deadlift' },
                { name: 'Agachamento com Salto/Jump Squat' },
                { name: 'Deadlift com Peso/Weighted Deadlift' },
              ],
            },
          },
        },
      }),
    ]);
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
