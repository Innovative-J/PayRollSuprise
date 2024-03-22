// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

const employeesArray = [];

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  let continueAddingEmployee = true;

  // prompt functionEngine used to recycle prompts
  function promptEngine(inputValue) {
    console.log()
    let inputPrompt = prompt(`Please enter your ${inputValue}`);
    if (!isNaN(inputPrompt) && inputValue != 'salary') {
      inputPrompt = prompt('Please enter a valid value');
      console.log('');
    } else if (inputValue == 'salary' && isNaN(inputPrompt)) {
      inputPrompt = prompt('Please enter a valid value');
      console.log()
    }
    return inputPrompt;
  }

  while (continueAddingEmployee) {
    let firstName = promptEngine('first name');
    let lastName = promptEngine('last name');
    let salary = promptEngine('salary');

    const employee = {
      firstName: firstName,
      lastName: lastName,
      salary: salary,
    }

    employeesArray.push(employee);


    const continueAddingEmployee = confirm("Would you like to add another employee?");
    if (!continueAddingEmployee) {
      console.log('employee data', employeesArray)
      break;
    }

  }
  return employeesArray;
}


const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
  if (employeesArray.length === 0) {
    console.log('No employees found.');
    return;
  }

  let totalSalary = 0;

  // Calculate total salary
  for (let i = 0; i < employeesArray.length; i++) {
    totalSalary += parseInt(employeesArray[i].salary);
  }

  // Calculate average salary
  const averageSalary = totalSalary / employeesArray.length;

  // Display average salary
  console.log('Average Salary:', averageSalary.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  }));
}


// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];
  console.log(`Congraulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`)

}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
