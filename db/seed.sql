
INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO company_role (role_title, salary, department_id)
VALUES ('Salesperson', 80000, 1),
       ('Lead Engineer', 120000, 2),
       ('Software Engineer', 100000, 2),
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mark', 'Plier', 6, NULL),
       ('Mad', 'Vladd', 7, 1),
       ('Eva', 'Willson', 5, 5),
       ('Kiwi', 'Nirvana', 5, 5),
       ('James', 'Steinheuser', 4, NULL),
       ('Billy', 'Billbert', 3, 7),
       ('Jay', 'Proguy', 2, NULL),
       ('Willy', 'Wonka', 1, 7),
       ('Herbert', 'Hershey', 1, 7);