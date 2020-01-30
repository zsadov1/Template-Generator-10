const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");


const inquirer = require("inquirer");
const fs = require("fs");

function htmlManager (name , title , id , email , officeNumber) {
    return `    
        <div class="card bg-light">
        <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <h3 class="card-title">${title}</h3> 
        </div>
        </div>
        <div class="card-body bg-light">
        <p class="card-text">ID: ${id}</p>
        <p class="card-text">Email: ${email}</p>
        <p class="card-text">Office Number: ${officeNumber}</p>
        </div>  
        </div>`;
}

function htmlEngineer (name , title ,  id , email,  github) {
    return `
        <div class="card bg-light">
        <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <h3 class="card-title">${title}</h3> 
        </div>
        </div>
        <div class="card-body bg-light">
        <p class="card-text">ID: ${id}</p>
        <p class="card-text">Email: ${email}</p>
        <p>Github: <a href="https://github.com/${github}" target = "_blank">${github}</a></p>
        </div>  
        </div>
    `;
}

function htmlIntern(name , title ,  id , email , school) {
    return ` 
        <div class="card bg-light">
        <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <h3 class="card-title">${title}</h3> 
        </div>
        </div>
        <div class="card-body bg-light">
        <p class="card-text">ID: ${id}</p>
        <p class="card-text">Email: ${email}</p>
        <p class="card-text">School: ${school}</p>
        </div>  
        </div>

    `;
}

function mainHtml (htmlEmployees , teamName) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${teamName}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <style>
    
    .specialType,
    .emailType, 
    .idType {
        background-color: white;
        border: 1px solid #ddd;
        padding: 8px 16px;
        margin: 0;
    }; 
        
    .idType {
        border-radius: 0.25rem 0.25rem 0 0;
        border-bottom: none;
    };

    .specialType {
        border-radius: 0 0 0.25rem 0.25rem;
        border-top: none;
    };
        
    </style>

</head>

<body>

    <header>
        <div class="jumbotron-fluid bg-success">
            <div class="row">
                <div class="col">
                    <h1 class= "text-dark text-center font-weight-bold">Team Summary</h1>
                    <h3 class="text-dark text-center">${teamName}</h3>
                </div>
            </div>
        </div>
    </header>

    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col d-flex jusitfy-content-center flex wrap">${htmlEmployees}</div>
            </div>
        </div>
    </section>

</body>
</html>
`;
}

class EmployeeBrief {
    constructor() {
        this.employeeArray = [];
        this.teamName = "";
    }

    createTeam() {
        this.employeeArray = [];
        console.log("Let's start building your team!");
        return this.teamTitle();
    }

    teamTitle() {
        return inquirer 
        .prompt([ 
            {
                typee:"input",
                name:"teamName",
                message:
                "What do you want to name your team? (letters and numbers..or else.",
                validate: function(val) {
                    return /^[0-9a-zA-Z]+$/gi.test(val);
                }
            }
        ])
        .then(val => {
            this.teamName = val.teamName;
            return this.createManager();
        });
    }

    createManager() {
        return inquirer
        .prompt([
        {
         type: "input",
         name: "employeeName",
         message: "What's the team managers name?",
         validate: function(val) {
             return /^[a-zA-Z]+([a-zA-Z]+)*$/gi.test(val);
         }  
        },
        {
         type: "input",
         name: "employeeId",
         message: "What's the team managers ID number?",
         validate: function(val) {
            return /^[0-9a-zA-Z]+$/gi.test(val);
         }     
        },
        {
         type: "input",
         name: "employeeEmail",
         message: "What's the team managers Email address?",
         validate: function(val) {
         let test;
         if (val.includes("@"))  {
             test = true;
         } else {
             test = false;
         }
         return test;
        }
        },
        {
        type: "input",
        name: "employeeOffice",
        message: "What's the team managers office number?",
        validate: function(val) {
        return /^[0-9a-zA-Z]+$/gi.test(val);
        }
        }
        ])
        .then(val => {
            const newManager = new Manager(
                val.employeeName,
                val.employeeId,
                val.employeeEmail,
                val.employeeOffice
            );
            this.employeeArray.push(newManager);
            return this.getTitle();
        });
    }
    
    getTitle(){
        return inquirer
        .prompt([{
            type: "list",
            name: "employeeTitle",
            message: "Would you like to add an Engineer or Intern?",
            choices: ["Engineer" , "Intern"]
        }
        ])
        .then(val => {
            const employeeTitle = val.employeeTitle;
            switch (employeeTitle) {
                case "Engineer":
                    return this.createEngineer();
                case "Intern":
                    return this.createIntern();
            }
        });
    }

    createEngineer() {
        return inquirer 
        .prompt([
            {
             type: "input",
             name: "employeeName",
             message: "What's the engineer's name?",
             validate: function(val) {
                 return /^[a-zA-Z]+([a-zA-Z]+)*$/gi.test(val);
             }  
            },
            {
             type: "input",
             name: "employeeId",
             message: "What's the engineer's ID number?",
             validate: function(val) {
                return /^[0-9a-zA-Z]+$/gi.test(val);
             }     
            },
            {
             type: "input",
             name: "employeeEmail",
             message: "What's the engineer's Email address?",
             validate: function(val) {
             let test;
             if (val.includes("@"))  {
                 test = true;
             } else {
                 test = false;
             }
             return test;
            }
            },
            {
            type: "input",
            name: "employeeGithub",
            message: "What's the engineer's Github?",
            validate: function(val) {
            return /[a-z1-9]/gi.test(val);
            }
            }
            ])
            .then(val => {
                const newEngineer = new Engineer(
                    val.employeeName,
                    val.employeeId,
                    val.employeeEmail,
                    val.employeeGithub
                );
                this.employeeArray.push(newEngineer);
                return this.askIfDone();
            });
        }

    createIntern(){
        return inquirer
        .prompt([
            {
             type: "input",
             name: "employeeName",
             message: "What's the Intern's name?",
             validate: function(val) {
                 return /^[a-zA-Z]+([a-zA-Z]+)*$/gi.test(val);
             }  
            },
            {
             type: "input",
             name: "employeeId",
             message: "What's the Intern's ID number?",
             validate: function(val) {
                return /^[0-9a-zA-Z]+$/gi.test(val);
             }     
            },
            {
             type: "input",
             name: "employeeEmail",
             message: "What's the intern's Email address?",
             validate: function(val) {
             let test;
             if (val.includes("@"))  {
                 test = true;
             } else {
                 test = false;
             }
             return test;
            }
            },
            {
            type: "input",
            name: "employeeSchool",
            message: "What's the Intern's school?",
            validate: function(val) {
            return /[a-z1-9]/gi.test(val);
            }
            }
            ])
            .then(val => {
                const newIntern = new Intern(
                    val.employeeName,
                    val.employeeId,
                    val.employeeEmail,
                    val.employeeGithub
                );
                this.employeeArray.push(newIntern);
                return this.askIfDone();
            });
        } 

    askIfDone(){
        return inquirer
        .prompt([
            {
            type: "list",
            name: "userDone",
            message: "Are you done?",
            choices:[ "Yes" , "No"]
            }
        ])
        .then(val => {
            if (val.userDone === "Yes") {
                return this.finishTeam();
            } else {
                return this.getTitle();
            }
        });
    }
    
    finishTeam() {
        function compare(a,b) {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            let comparison = 0;
            if (nameA > nameB) {
                comparison = 1;
            } else if (nameB > nameA) {
                comparison = -1;
            }
            return comparison;
        }
        this.employeeArray.sort(compare);


        let sortedEmployeeArray = [];
        let tempManagerArray = [];
        let tempEngineerArray = [];
        let tempInternArray = [];
        for (const employee of this.employeeArray) {
            switch (employee.title) {
                case "Manager":
                    tempManagerArray.push(employee);
                    break;
                case "Engineer":
                    tempEngineerArray.push(employee);
                    break;
                case "Intern":
                    tempInternArray.push(employee);
                    break;
            }
        }

        for (const manager of tempManagerArray) {
            sortedEmployeeArray.push(manager);
        }
        for (const engineer of tempEngineerArray) {
            sortedEmployeeArray.push(engineer);
        }
        for (const intern of tempInternArray) {
            sortedEmployeeArray.push(intern);
        }


        let htmlEmployees = "";
        for (const employee of sortedEmployeeArray) {
            switch (employee.title) {
                case "Manager":
                    const managerHTMLcard = htmlManager(
                        employee.name,
                        employee.title,
                        employee.id,
                        employee.email,
                        employee.officeNumber
                    );
                    htmlEmployees += managerHTMLcard;
                    break;
                    case "Engineer":
                        const engineerHTMLcard = htmlEngineer(
                            employee.name,
                            employee.title,
                            employee.id,
                            employee.email,
                            employee.github
                        );
                        htmlEmployees += engineerHTMLcard;
                        break;
                        case "Intern":
                            const internHTMLcard = htmlIntern(
                                employee.name,
                                employee.title,
                                employee.id,
                                employee.email,
                                employee.school
                            );
                            htmlEmployees += internHTMLcard;
                            break;
            }
        }

        const fullHTML = mainHtml(htmlEmployees, this.teamName);

        fs.writeFile(`./output/${this.teamName}.html`, fullHTML, err => {
          if (err) {
            return console.log(err);
          }
          console.log(
            `Successfully wrote ${this.teamName}.html in the output folder.`
          );
          return this.newTeam();
        });
      }
    
      newTeam() {
        return inquirer
          .prompt([
            {
              type: "list",
              name: "moreTeam",
              message: "Would you like to build another team?",
              choices: ["Yes", "No"]
            }
          ])
          .then(val => {
            if (val.moreTeam === "Yes") {
              return this.createTeam();
            } else {
              return console.log(
                "Thank you for using the template engine! Goodbye."
              );
            }
          });
      }
    }
    
    const newTeam = new EmployeeBrief();
    
    newTeam.createTeam();










