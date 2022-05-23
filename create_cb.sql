CREATE DATABASE db_quiz;

CREATE TABLE scores 
(
    score_id INT PRIMARY KEY AUTO_INCREMENT,
    score_points INT,
    pseudo VARCHAR(20),
    difficulty VARCHAR(10),
    number_of_themes INT
);

