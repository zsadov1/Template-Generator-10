const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");


const inquirer = require("inquirer");
const fs = requires ("fs");

function htmlManager (name , id , email , officeNumber) {
    return ` 
    <div class="card bg-dark">
        <div class="card-header">
            <h2>${name}</h2>
            <h3>${Title}</h3> 
        </div>
    </div>
    <div class="card-body bg-dark">
        <p>ID: ${id}</p>
        <p>Email: ${email}</p>
        <p>Office Number: ${officeNumber}</p>
    </div>  
    </div>
     `
};

function htmlEngineer (name , id , github) {
    return ` 
    <div class="card bg-dark">
        <div class="card-header">
            <h2>${name}</h2>
            <h3>${Title}</h3> 
        </div>
    </div>
    <div class="card-body bg-dark">
        <p>ID: ${id}</p>
        <p>Email: ${email}</p>
        <p>Github: <a href="https://github.com/${github}" target = "_blank">${github}</a></p>
    </div>  
    </div>
    `
};

function htmlIntern(name , id , school) {
    return ` 
    <div class="card bg-dark">
        <div class="card-header">
            <h2>${name}</h2>
            <h3>${Title}</h3> 
        </div>
    </div>
    <div class="card-body bg-dark">
        <p>ID: ${id}</p>
        <p>Email: ${email}</p>
        <p>School: ${school}</p>
    </div>  
    </div>
    `
};




