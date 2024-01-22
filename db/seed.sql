
INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO company_role (role_title, salary, department_id)
VALUES ('Salesperson', 80000.00, 1),
       ('Lead Engineer', 120000.00, 2),
       ('Software Engineer', 100000.00, 2),
       ('Account Manager', 160000.00, 3),
       ('Accountant', 125000.00, 3),
       ('Legal Team Lead', 250000.00, 4),
       ('Lawyer', 190000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mark', 'Plier', 6, 1),
       ('Mad', 'Vladd', 7, NULL),
       ('Eva', 'Willson', 5, NULL),
       ('Kiwi', 'Nirvana', 5, NULL),
       ('James', 'Steinheuser', 4, 5),
       ('Billy', 'Billbert', 3, NULL),
       ('Jay', 'Proguy', 2, 7),
       ('Willy', 'Wonka', 1, NULL),
       ('Herbert', 'Hershey', 1, NULL);