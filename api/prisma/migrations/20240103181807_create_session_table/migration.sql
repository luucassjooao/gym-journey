-- CreateEnum
CREATE TYPE "type_session" AS ENUM ('DELOAD', 'STRENGTH', 'HYPERTROPHY');

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "typeSession" "type_session" NOT NULL,
    "duration" JSONB NOT NULL,
    "series_information" JSONB[],

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MuscleGroupToSession" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MuscleGroupToSession_AB_unique" ON "_MuscleGroupToSession"("A", "B");

-- CreateIndex
CREATE INDEX "_MuscleGroupToSession_B_index" ON "_MuscleGroupToSession"("B");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MuscleGroupToSession" ADD CONSTRAINT "_MuscleGroupToSession_A_fkey" FOREIGN KEY ("A") REFERENCES "mucles_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MuscleGroupToSession" ADD CONSTRAINT "_MuscleGroupToSession_B_fkey" FOREIGN KEY ("B") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
