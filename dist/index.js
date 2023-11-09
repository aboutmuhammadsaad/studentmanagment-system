import inquirer from 'inquirer';
const students = [];
function generateStudentId() {
    const randomId = Math.floor(10000 + Math.random() * 90000).toString();
    return `S${randomId}`;
}
function addStudent() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:',
        },
        {
            type: 'input',
            name: 'courses',
            message: 'Enter courses (comma-separated):',
            filter: (input) => input.split(',').map((course) => course.trim()),
        },
    ])
        .then((answers) => {
        const id = generateStudentId();
        const balance = 0;
        students.push({ ...answers, id, balance });
        console.log(`Student added! ID: ${id}`);
        mainMenu();
    });
}
function enrollStudent() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:',
        },
        {
            type: 'input',
            name: 'courses',
            message: 'Enter additional courses (comma-separated):',
            filter: (input) => input.split(',').map((course) => course.trim()),
        },
    ])
        .then(({ id, courses }) => {
        const student = students.find((s) => s.id === id);
        if (student) {
            student.courses.push(...courses);
            console.log('Enrollment successful!');
        }
        else {
            console.log('Student not found.');
        }
        mainMenu();
    });
}
function viewBalance() {
    inquirer
        .prompt({
        type: 'input',
        name: 'id',
        message: 'Enter student ID:',
    })
        .then(({ id }) => {
        const student = students.find((s) => s.id === id);
        if (student) {
            console.log(`Balance for ${student.name}: $${student.balance}`);
        }
        else {
            console.log('Student not found.');
        }
        mainMenu();
    });
}
function payTuitionFees() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:',
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter payment amount:',
            validate: (input) => !isNaN(Number(input)) || 'Please enter a valid number.',
        },
    ])
        .then(({ id, amount }) => {
        const student = students.find((s) => s.id === id);
        if (student) {
            student.balance -= Number(amount);
            console.log(`Payment successful! Remaining balance: $${student.balance}`);
        }
        else {
            console.log('Student not found.');
        }
        mainMenu();
    });
}
function showStatus() {
    console.log('Student Status:');
    students.forEach(({ name, id, courses, balance }) => {
        console.log(`
      Name: ${name}
      ID: ${id}
      Courses: ${courses.join(', ')}
      Balance: $${balance}
    `);
    });
    mainMenu();
}
function mainMenu() {
    inquirer
        .prompt({
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: [
            'Add New Student',
            'Enroll Student',
            'View Balance',
            'Pay Tuition Fees',
            'Show Status',
            'Exit',
        ],
    })
        .then(({ action }) => {
        switch (action) {
            case 'Add New Student':
                addStudent();
                break;
            case 'Enroll Student':
                enrollStudent();
                break;
            case 'View Balance':
                viewBalance();
                break;
            case 'Pay Tuition Fees':
                payTuitionFees();
                break;
            case 'Show Status':
                showStatus();
                break;
            case 'Exit':
                console.log('Goodbye!');
                break;
        }
    });
}
console.log('Welcome to the Student Management System!');
mainMenu();
