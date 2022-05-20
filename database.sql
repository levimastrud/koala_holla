CREATE TABLE koala (
    "id" primary key,
    "name" varchar(100),
    "gender" varchar(100),
    "age" number,
    "ready_to_transfer" boolean DEFAULT False,
    "notes"
);

INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Scotty', 'M', '4', 'True', 'Born in Guatemala'), 
('Jean', 'F', '5', 'True', 'Allergic to lots of lava'),
('Ororo', 'F', '7', 'False', 'Loves listening to Paula (Abdul)'),
('Charlie', 'M', '9', 'True', 'Favorite band is Nirvana'),
('Betsy', 'F', '4', 'True', 'Has a pet iguana');