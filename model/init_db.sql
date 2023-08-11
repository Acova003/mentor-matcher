--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists mentees;
DROP TABLE if exists mentors;
DROP TABLE if exists mentor_mentee;
SET foreign_key_checks = 1;


--
-- Create Tables
--

CREATE TABLE mentees(
    id INT NOT NULL AUTO_INCREMENT, 
    full_name VARCHAR(225) not null, 
    email VARCHAR(40) not null, 
    questionnaire_responses JSON,
    PRIMARY KEY (id)
    );


CREATE TABLE mentors ( 
    id INT NOT NULL AUTO_INCREMENT, 
    full_name VARCHAR(225) not null, 
    email VARCHAR(40) not null,
    questionnaire_responses JSON,
    PRIMARY KEY (id)
    );

CREATE TABLE mentor_mentee (
    id INT NOT NULL AUTO_INCREMENT,
    mentor_id INT NOT NULL,
    mentee_id INT NOT NULL,
    compatibility_score INT,
    compatibility_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (mentor_id) REFERENCES mentors(id),
    FOREIGN KEY (mentee_id) REFERENCES mentees(id)
    );
