const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connected to employee_db.')
);

db.connect((err) => {
    if (err) throw err;
    console.log('connected to the MySQL database.');
    startEmployeeTracker();
});

// module.exports = db; maybe delete this line of code

function startEmployeeTracker() {
    inquirer
        .prompt({
            type: 'list',
            name: 'menuChoice',
            message: 'Pick an option',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ],
        })
        .then((answers) => {
            switch (answers.menuChoice) {
                case 'View all departments':
                    getAllDepartments();
                    break;
                case 'View all roles':
                    getAllRoles();
                    break;
                case 'View all employees':
                    getAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addNewRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'EXIT':
                    db.end();
                    console.log('Ending Program');
                    break;
            }
        });
}

//to handle Database Queries to get all departments
function getAllDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        startEmployeeTracker();
    });
}
//queries for view all roles
function getAllRoles() {
    db.query('SELECT * FROM company_role', (err, res) => {
        if (err) throw err;
        console.table(res);
        startEmployeeTracker();
    });
}
//queries for view all employees
function getAllEmployees() {
    db.query('SELECT first_name, last_name, role_id, manager_id FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        startEmployeeTracker();
    });
}

//add code to add a department here
function addDepartment() {
    inquirer
        .prompt({
            type: 'input',
            name: 'department_name',
            message: 'Enter the name of the new department:',
        })
        .then((answers) => {
            db.query(
                'INSERT INTO department (name) VALUES (?)',
                [answers.department_name],
                (err, res) => {
                    if (err) throw err;
                    console.log('Department successfully added');
                    startEmployeeTracker();
                }
            );
        });
}
//add code to add a role here
function addNewRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role_title',
                message: 'Enter the name of the new role:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the new role:',
                validate: (input) => {
                    const isValidAmount = !isNaN(input) && input > 0;
                    return isValidAmount || 'Please use a valid poitive number for salary.';
                },
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Select the department for the new role',
                choices: () => getDepartmentChoices(),
            },
        ])
        .then((answers) => {
            db.query(
                'INSERT INTO company_role (role_title, salary, department_id) VALUES (?, ?, ?)',
                [answers.role_title, answers.salary, answers.department_id],
                (err, res) => {
                    if (err) throw err;
                    console.log('Role successfully added');
                    startEmployeeTracker();
                }
            );
        });
}
//allows us to choose a department for adding a new role
function getDepartmentChoices() {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, name FROM department', (err, results) => {
            if (err) {
                reject(err);
            } else {
                const choices = results.map((department) => ({
                    name: department.name,
                    value: department.id,
                }));
                console.log('Choicces:', choices);
                resolve(choices);
            }
        });
    });
}
//How to add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Type employees first name:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Type employees last name:',
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Pick your employees role:',
                choices: () => getRoleChoices(),
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Pick your employees manager:',
                choices: () => getManagerChoices(),
            },
        ])
        .then((answers) => {
            db.query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
                (err, res) => {
                    if (err) throw err;
                    console.log('Employee successfully added');
                    startEmployeeTracker();
                }
            );
        });
}
//lets user assign a role
function getRoleChoices() {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, role_title FROM company_role', (err, results) => {
            if (err) {
                reject(err);
            } else {
                const choices = results.map((role) => ({
                    name: role.role_title,
                    value: role.id,
                }));
                resolve(choices);
            }
        });
    });
}
//lets user assign a manager
function getManagerChoices() {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL', (err, results) => {
            if (err) {
                reject(err);
            } else {
                const choices = results.map((manager) => ({
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id,
                }));
                resolve(choices);
            }
        });
    });
}

//updating the employee role--get employee choices
function getEmployeeChoices() {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, first_name, last_name FROM employee', (err, results) => {
            if (err) {
                reject(err);
            } else {
                const choices = results.map((employee) => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                }));
                resolve(choices);
            }
        });
    });
}
//updating the employee role--updating the role after getting the choices
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Select an employee to update their role',
                choices: () => getEmployeeChoices(),
            },
            {
                type: 'list',
                name: 'new_role_id',
                message: 'Select the new role for the emmployee',
                choices: () => getRoleChoices(),
            },
        ])
        .then((answers) => {
            db.query(
                'UPDATE employee SET role_id = ? WHERE id = ?',
                [answers.new_role_id, answers.employee_id],
                (err, res) => {
                    if (err) throw err;
                    console.log('Employee role updated');
                    startEmployeeTracker();
                }
            );
        });
}

//used to ensure the closing from the database, meant to be last line of code.
process.on('SIGINT', () => {
    db.end((err) => {
        if (err) {
            console.error('Problems disconnecting', err);
        } else {
            console.log('Safely exited');
        }
        process.exit();
    });
});