const form = document.getElementById("attendanceForm");
const table = document.getElementById("attendanceTable");

let attendanceData = JSON.parse(localStorage.getItem("attendance")) || [];

function displayAttendance() {
  table.innerHTML = "";

  attendanceData.forEach((record, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${record.studentId}</td>
      <td>${record.name}</td>
      <td>${record.date}</td>
      <td>${record.className}</td>
      <td><button onclick="deleteRecord(${index})">Delete</button></td>
    `;

    table.appendChild(row);
  });
}

function deleteRecord(index) {
  attendanceData.splice(index, 1);
  localStorage.setItem("attendance", JSON.stringify(attendanceData));
  displayAttendance();
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const record = {
    studentId: document.getElementById("studentId").value,
    name: document.getElementById("name").value,
    date: document.getElementById("date").value,
    className: document.getElementById("className").value
  };

  attendanceData.push(record);
  localStorage.setItem("attendance", JSON.stringify(attendanceData));

  displayAttendance();
  form.reset();
});

displayAttendance();
function searchStudent() {
  const searchValue = document.getElementById("searchId").value;

  const filteredData = attendanceData.filter(record =>
    record.studentId === searchValue
  );

  table.innerHTML = "";

  filteredData.forEach((record, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.studentId}</td>
      <td>${record.name}</td>
      <td>${record.date}</td>
      <td>${record.className}</td>
      <td><button onclick="deleteRecord(${index})">Delete</button></td>
    `;
    table.appendChild(row);
  });
}

function resetSearch() {
  document.getElementById("searchId").value = "";
  displayAttendance();
}
function searchByName() {
  const searchValue = document.getElementById("searchName").value.toLowerCase();

  const filteredData = attendanceData.filter(record =>
    record.name.toLowerCase().includes(searchValue)
  );

  table.innerHTML = "";

  filteredData.forEach((record, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.studentId}</td>
      <td>${record.name}</td>
      <td>${record.date}</td>
      <td>${record.className}</td>
      <td><button onclick="deleteRecord(${index})">Delete</button></td>
    `;
    table.appendChild(row);
  });
}
function handleNameSearchKey(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // stops page refresh
    searchByName();
  }
}
function exportToExcel() {
  if (attendanceData.length === 0) {
    alert("No data to export!");
    return;
  }

  let csv = "Student ID,Name,Date,Class\n";

  attendanceData.forEach(record => {
    csv += `${record.studentId},${record.name},${record.date},${record.className}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "attendance.csv";
  a.click();

  window.URL.revokeObjectURL(url);
}
