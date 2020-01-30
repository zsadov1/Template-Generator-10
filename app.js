const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");


const inquirer = require("inquirer");
const fs = require("fs");

function htmlManager (name , id , email , officeNumber) {
    return `    
        <div class="card bg-light" style="width: 18rem;">
        <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <h3 class="card-title">${Title}</h3> 
        </div>
        </div>
        <div class="card-body bg-light" style="width: 18rem;">
        <p class="card-text">ID: ${id}</p>
        <p class="card-text">Email: ${email}</p>
        <p class="card-text">Office Number: ${officeNumber}</p>
        </div>  
        </div>`;
}

function htmlEngineer (name , id , github) {
    return `
        <div class="card bg-light" style="width: 18rem;">
        <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <h3 class="card-title">${Title}</h3> 
        </div>
        </div>
        <div class="card-body bg-light" style="width: 18rem;">
        <p class="card-text">ID: ${id}</p>
        <p class="card-text">Email: ${email}</p>
        <p>Github: <a href="https://github.com/${github}" target = "_blank">${github}</a></p>
        </div>  
        </div>
    `;
}

function htmlIntern(name , id , school) {
    return ` 
        <div class="card bg-light" style="width: 18rem;">
        <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <h3 class="card-title">${Title}</h3> 
        </div>
        </div>
        <div class="card-body bg-light" style="width: 18rem;">
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
                    <h3 class="text-dark text-center">Team Name: ${teamName}</h3>
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
                name:"team name",
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
             return /^[0-9]+*$/gi.test(val);
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
        return /^[0-9]+*$/gi.test(val);
        }
        }
        ])
        .then(val => {
            const newManager = new Manager(
                val.employeeName,
                val.employeeId,
                val.employeeemail,
                val.employeeOffice
            );
            this.employeeArray.push(newManager);
            return this.getTitle();
        });
    }


