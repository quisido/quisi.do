CREATE TABLE IF NOT EXISTS [projects] (
  "userId" UNSIGNED INTEGER NOT NULL,
  "projectId" INTEGER PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT "",
  "origins" TEXT NOT NULL DEFAULT ""
  -- FOREIGN KEY(`userId`) REFERENCES users(`id`) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_projects_userId
ON projects(`userId`);

DELETE FROM `projects`;

INSERT INTO `projects` (`name`, `origins`, `userId`)
VALUES ("quisi.do", "http://localhost:3000 https://localhost:3000 https://quisi.do", 1);
