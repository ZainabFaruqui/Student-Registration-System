// Get saved students or set empty list
let students = JSON.parse(localStorage.getItem("students")) || [];

// Show students on page load
displayStudents();

// Handle form submit
document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("studentName").value.trim();
  let id = document.getElementById("studentID").value.trim();
  let email = document.getElementById("email").value.trim();
  let contact = document.getElementById("contactNo").value.trim();

  if (!name || !id || !email || !contact) {
    alert("All fields are required.");
    return;
  }

  if (!isNaN(name)) {
    alert("Name must contain only letters.");
    return;
  }

  if (isNaN(id) || id <= 0) {
    alert("ID must be a valid number.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Enter a valid email.");
    return;
  }

  if (isNaN(contact) || contact.length < 10) {
    alert("Enter a valid contact number.");
    return;
  }

  let student = { name, id, email, contact };
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  displayStudents();
  document.getElementById("registrationForm").reset();
});

// Show student records
function displayStudents() {
  let tbody = document.querySelector("#recordsTable tbody");
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editStudent(${index})" class="edit-btn">Edit</button>
        <button onclick="deleteStudent(${index})" class="delete-btn">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Delete a student
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

// Edit a student
function editStudent(index) {
  let student = students[index];

  document.getElementById("studentName").value = student.name;
  document.getElementById("studentID").value = student.id;
  document.getElementById("email").value = student.email;
  document.getElementById("contactNo").value = student.contact;

  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}