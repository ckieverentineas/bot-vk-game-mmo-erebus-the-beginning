-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coal" REAL NOT NULL DEFAULT 0,
    "iron_ore" REAL NOT NULL DEFAULT 0,
    "iron" REAL NOT NULL,
    "gold_ore" REAL NOT NULL DEFAULT 0,
    "artefact" REAL NOT NULL DEFAULT 0,
    "energy" REAL NOT NULL,
    "gold" REAL NOT NULL,
    "people" INTEGER NOT NULL DEFAULT 5,
    "crystal" INTEGER NOT NULL DEFAULT 0,
    "id_user" INTEGER NOT NULL,
    CONSTRAINT "Resource_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("artefact", "coal", "crystal", "energy", "gold", "gold_ore", "id", "id_user", "iron", "iron_ore", "people") SELECT "artefact", "coal", "crystal", "energy", "gold", "gold_ore", "id", "id_user", "iron", "iron_ore", "people" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
