
CREATE DATABASE IF NOT EXISTS tetrjs;

USE tetrjs;

CREATE TABLE IF NOT EXISTS high_scores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(3) NOT NULL,
  score INT NOT NULL,
  INDEX USING HASH (score)
);