export async function getEmployeeList(page) {
  const response = await fetch(`http://127.0.0.1:8000/api/employees?page=${page}`);
  const data = await response.json();
  return {
    employeelist: data.results.data,
    totalpage: data.results.total, 
    perpage: data.results.per_page
  }
}

export async function fetchEmployee(id) {
  const response = await fetch("http://127.0.0.1:8000/api/employees/"+id);
  return response.json()
}

export async function createEmployee(newEmployee) {
  const response = await fetch("http://127.0.0.1:8000/api/employeessave", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newEmployee)
  });
  console.log(response);
  return response.json()
}

export async function updateEmployee(updatedEmployee) {
  const response = await fetch(`http://127.0.0.1:8000/api/employeesupdate/${updatedEmployee.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedEmployee)
  });
  console.log(response)
  return response.json()
}

export async function deleteEmployee(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/employees/${id}`, {
    method: "DELETE",
  });
  return response.json()
}