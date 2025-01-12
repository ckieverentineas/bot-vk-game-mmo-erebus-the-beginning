/*
  Warnings:

  - You are about to drop the `System` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `reputation` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `research` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `build` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the column `crystal` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the column `gas` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the column `golden` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the column `id_system` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the column `iron` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the column `oil` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the column `uranium` on the `Planet` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `input` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `output` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `require` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `storage` on the `Builder` table. All the data in the column will be lost.
  - Added the required column `artefact` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coal` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gold_ore` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iron_ore` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gold_ore` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iron_ore` to the `Planet` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "System";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Blueprint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "system_name" TEXT NOT NULL,
    "lvl" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Blueprint_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coal" REAL NOT NULL,
    "iron_ore" REAL NOT NULL,
    "iron" REAL NOT NULL,
    "gold_ore" REAL NOT NULL,
    "artefact" REAL NOT NULL,
    "energy" REAL NOT NULL,
    "gold" REAL NOT NULL,
    "people" INTEGER NOT NULL DEFAULT 5,
    "crystal" INTEGER NOT NULL DEFAULT 0,
    "id_user" INTEGER NOT NULL,
    CONSTRAINT "Resource_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("crystal", "energy", "gold", "id", "id_user", "iron") SELECT "crystal", "energy", "gold", "id", "id_user", "iron" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE TABLE "new_Planet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "coal" REAL NOT NULL,
    "iron_ore" REAL NOT NULL,
    "gold_ore" REAL NOT NULL,
    "artefact" REAL NOT NULL,
    "id_user" INTEGER,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Planet" ("artefact", "coal", "crdate", "id", "id_user", "name", "update") SELECT "artefact", "coal", "crdate", "id", "id_user", "name", "update" FROM "Planet";
DROP TABLE "Planet";
ALTER TABLE "new_Planet" RENAME TO "Planet";
CREATE TABLE "new_Builder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lvl" INTEGER NOT NULL DEFAULT 1,
    "gold" REAL NOT NULL DEFAULT 0,
    "iron" REAL NOT NULL DEFAULT 0,
    "people" INTEGER NOT NULL DEFAULT 0,
    "id_user" INTEGER NOT NULL,
    "id_planet" INTEGER,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Builder_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Builder" ("crdate", "id", "id_planet", "id_user", "lvl", "name", "update") SELECT "crdate", "id", "id_planet", "id_user", "lvl", "name", "update" FROM "Builder";
DROP TABLE "Builder";
ALTER TABLE "new_Builder" RENAME TO "Builder";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
