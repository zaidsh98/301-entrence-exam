'use strict';
// Global Variables : 

let form = document.getElementById('form');
let table = document.getElementById('table');

let tableHeaderArr = ['student Name', 'Student Grade','Course', 'Status'];
let arrOfObj = [];

// Random Number Generatot Between Min & Max Numbers :

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// eslint-disable-next-line no-redeclare
function status(){
  let status = '';
  if(getRandomNum(0, 100) >= 50){
    status = 'Success';
  }
  else {
    status = 'Fail';
  }
  return status;
}

// Constructer Function :

function Grades(name, course){
  this.name = name;
  this.course = course;
  arrOfObj.push(this);
}

//Prototype Function for rendering data to the table :

Grades.prototype.renderAll = function(){
  let trEl = document.createElement('tr');

  let nameTd = document.createElement('td');
  nameTd.textContent = this.name;
  let gradeTd = document.createElement('td');
  gradeTd.textContent = getRandomNum(0, 100);
  let courseTd = document.createElement('td');
  courseTd.textContent = this.course;
  let statusTd = document.createElement('td');
  statusTd.textContent = status();

  trEl.appendChild(nameTd);
  trEl.appendChild(gradeTd);
  trEl.appendChild(courseTd);
  trEl.appendChild( statusTd);

  table.appendChild(trEl);

};
// function for rendering the table header : 

function renderHeader(){
  let trEl = document.createElement('tr');
  let thEl;
  for (let i = 0; i < tableHeaderArr.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = tableHeaderArr[i];
    trEl.appendChild(thEl);
  }
  table.appendChild(trEl);
}



// Event function to handle submition : 

function handlesubmition(event){
  event.preventDefault();

  let stdName = event.target.stdName.value;
  let course = event.target.course.value;
  let stdInfo = new Grades(stdName,course);
  stdInfo.renderAll();

  localStorage.setItem('gradesTracker', JSON.stringify(arrOfObj));
}

// function for rendering the table data after refrishing :

function renderFromLs(){
  for (let i = 0; i < arrOfObj.length; i++) {
    let trEl = document.createElement('tr');

    let nameTd = document.createElement('td');
    nameTd.textContent = arrOfObj[i].name;
    let gradeTd = document.createElement('td');
    gradeTd.textContent = getRandomNum(0, 100);
    let courseTd = document.createElement('td');
    courseTd.textContent = arrOfObj[i].course;
    let statusTd = document.createElement('td');
    statusTd.textContent = status();

    trEl.appendChild(nameTd);
    trEl.appendChild(gradeTd);
    trEl.appendChild(courseTd);
    trEl.appendChild( statusTd);

    table.appendChild(trEl);
  }
}

// checking the data in the LS to get it Back to the website: 

function checkLs(){
  if(localStorage.getItem('gradesTracker')){
    arrOfObj = JSON.parse(localStorage.getItem('gradesTracker'));
    renderFromLs();
  }
}

form.addEventListener('submit', handlesubmition);
renderHeader();
checkLs();
