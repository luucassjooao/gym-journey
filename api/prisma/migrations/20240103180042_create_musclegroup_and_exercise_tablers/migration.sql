-- CreateTable
CREATE TABLE "mucles_groups" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "media" TEXT,

    CONSTRAINT "mucles_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" UUID NOT NULL,
    "muscles_groups_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "media" TEXT,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_muscles_groups_id_fkey" FOREIGN KEY ("muscles_groups_id") REFERENCES "mucles_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
