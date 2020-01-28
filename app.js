const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");


const inquirer = require("inquirer");
const fs = requires ("fs");

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
    </div>
     `;
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

function htmlMain (htmlEmployees , teamName) {
    return `${main.html}`;
}






