export async function getTaskList(page) {
  const response = await fetch(`http://127.0.0.1:8000/api/tasks?page=${page}`);
  const data = await response.json();
  return {
    tasklist: data.results.data,
    totalpage: data.results.total, 
    perpage: data.results.per_page
  }
}

export async function fetchTask(id) {
  const response = await fetch("http://127.0.0.1:8000/api/tasks/"+id);
  return response.json()
}

export async function createTask(newTask) {
  const response = await fetch("http://127.0.0.1:8000/api/taskssave", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTask)
  });
  console.log(response);
  return response.json()
}

export async function updateTask(updatedTask) {
  const response = await fetch(`http://127.0.0.1:8000/api/tasksupdate/${updatedTask.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedTask)
  });
  console.log(response)
  return response.json()
}

export async function deleteTask(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
    method: "DELETE",
  });
  return response.json()
}