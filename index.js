// const generateHTML = require('./src/generateHTML.js');

// team profiles
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

// node modules 
const fs = require('fs'); 
const inquirer = require('inquirer');

// team array
const teamArray = []; 

// start of manager prompts 
const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Who is the manager of this team?', 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Please enter the manager's name!");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the manager's ID.",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Please enter the manager's ID!")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the manager's email.",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('Please enter an email!')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the manager's office number",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ('Please enter an office number!')
                    return false; 
                } else {
                    return true;
                }
            }
        }
    ])
    .then(managerInput => {
        const  { name, id, email, officeNumber } = managerInput; 
        const manager = new Manager (name, id, email, officeNumber);
        manager.special=manager.officeNumber
        teamArray.push(manager); 
        console.log(manager); 
    })
};

const addEmployee = () => {
    console.log(`
    =================
    Adding employees to the team
    =================
    `);

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "Please choose your employee's role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "What's the name of the employee?", 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Please enter an employee's name!");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID.",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Please enter the employee's ID!")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's email.",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('Please enter an email!')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter the employee's github username.",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ("Please enter the employee's github username!")
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter the intern's school",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Please enter the intern's school!")
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        // data for employee types 

        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);
            employee.special=employee.github

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);
            employee.special=employee.school
            console.log(employee);
        }

        teamArray.push(employee); 

        if (confirmAddEmployee) {
            return addEmployee(teamArray); 
        } else {
            return teamArray;
        }
    })

};


// function to generate HTML page file using file system 
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        // if there is an error 
        if (err) {
            console.log(err);
            return;
        // when the profile has been created 
        } else {
            console.log("Your team profile has been successfully created! Please check out the index.html")
        }
    })
}; 

addManager()
  .then(addEmployee)
  .then(teamArray => {
    // return generateHTML(teamArray);
  fs.writeFileSync('./dist/teamProfile.html', `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <title>Document</title>
</head>
<body>
  `)
for (let i = 0; i < teamArray.length; i++){
    console.log(teamArray[i])
    fs.appendFileSync("./dist/teamProfile.html",`
    <div>
    <h1>
        Role: ${teamArray[i].getRole()}
        </h1>
        <h2>
        Name:${teamArray[i].getName()}
        </h2>
        <h3>
            ID:${teamArray[i].getId()}
        </h3>
        <h3>
            Email:${teamArray[i].getEmail()}
        </h3>
        <h3>
            ${teamArray[i].special}
        </h3>
   </div>
    `
    )
}


fs.appendFileSync("./dist/teamProfile.html", `
</body>
</html>
`)


  })
//   .then(pageHTML => {
//     // return writeFile(pageHTML);
//     fs.writeFileSync('./dist/teamProfile.html', `
//   <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="stylesheet" href="./style.css">
//     <title>Document</title>
// </head>
// <body>
//   `)
//   fs.appendFileSync("./dist/teamProfile.html", `
//   <div>
//     <h1>
//         Role: 
//         </h1>
//         <h2>
//         Name:
//         </h2>
//         <h3>
//             ID:
//         </h3>
//         <h3>
//             Email:
//         </h3>
//         <h3>
            
//         </h3>
//    </div>
//    <div>
//     <h1>
//         Role: 
//         </h1>
//         <h2>
//         Name:
//         </h2>
//         <h3>
//             ID:
//         </h3>
//         <h3>
//             Email:
//         </h3>
//         <h3>
            
//         </h3>
//    </div>
//    <div>
//     <h1>
//         Role: 
//         </h1>
//         <h2>
//         Name:
//         </h2>
//         <h3>
//             ID:
//         </h3>
//         <h3>
//             Email:
//         </h3>
//         <h3>
            
//         </h3>
//    </div>
//   `
//   )
// fs.appendFileSync("./dist/teamProfile.html", `
// </body>
// </html>
// `)
//   })
  .catch(err => {
 console.log(err);
  });