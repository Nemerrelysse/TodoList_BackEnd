CREATE TABLE Users(
   userId INT AUTO_INCREMENT,
   email VARCHAR(50) NOT NULL,
   password VARCHAR(50) NOT NULL,
   PRIMARY KEY(userId),
   UNIQUE(email)
);

CREATE TABLE Lists(
   userId INT,
   listId INT AUTO_INCREMENT,
   ListName VARCHAR(50) NOT NULL,
   PRIMARY KEY(userId, listId),
   FOREIGN KEY(userId) REFERENCES Users(userId)
);

CREATE TABLE Tasks(
   userId INT,
   listId INT,
   taskId INT AUTO_INCREMENT,
   TaskName VARCHAR(50) NOT NULL,
   Note VARCHAR(200),
   DeadLine DATE,
   Done BOOLEAN NOT NULL DEFAULT 0,
   PRIMARY KEY(userId, listId, taskId),
   FOREIGN KEY(userId, listId) REFERENCES Lists(userId, listId)
);

CREATE TABLE Steps(
   userId INT,
   listId INT,
   taskId INT,
   stepId INT AUTO_INCREMENT,
   stepName VARCHAR(50) NOT NULL,
   Done BOOLEAN NOT NULL DEFAULT 0,
   PRIMARY KEY(userId, listId, taskId, stepId),
   FOREIGN KEY(userId, listId, taskId) REFERENCES Tasks(userId, listId, taskId)
);
