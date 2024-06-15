CREATE TABLE IF NOT EXISTS [projects] (
  "projectId" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "name" TEXT NOT NULL DEFAULT "",
  "origins" TEXT NOT NULL DEFAULT "",
  "userId" INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_projects_userId ON projects(`userId`);

INSERT INTO `projects` (`name`, `origins`, `userId`)
VALUES ("quisi.do", "http://localhost:3000 https://localhost:3000 https://quisi.do", 1);
