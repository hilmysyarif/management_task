"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query"; 
import { getEmployeeList } from "@/app/api/employee";
  
const TaskForm = ({ onSubmit, initialValue }) => {
  const [task, setTask] = useState({
    employee_id: initialValue.employee_id || "",
    task_name: initialValue.task_name || "",
    due_date: initialValue.due_date || ""
  });
  const handleChangeInput = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const { data } = useQuery({
      queryKey: ["employees"],
      queryFn: () => getEmployeeList()
  });
  
  const renderField = (label, value) => (
    <div>
      <label className="form-label">{label}</label>
      <input onChange={handleChangeInput} type="text" name={value} value={task[value]} 
        className="form-control"
      />
    </div>
  );

  const renderSelectField = (label, value, employeelist) => (
    <div>
      <label className="form-label">{label}</label>

      <select 
        name={value} 
        value={task[value]} 
        onChange={handleChangeInput}
        className="form-control"
      >
        {employeelist ? employeelist.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        )) : ''}
      </select>
    </div>
  );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({
      employee_id: "",
      task_name: "",
      due_date: ""
    })
  
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">{renderSelectField('Nama Karyawan', 'employee_id', data?.employeelist)}</div>
      <div className="mb-5">{renderField('Task Name', 'task_name')}</div>
      <div className="mb-5">{renderField('Due Date', 'due_date')}</div>

      <a
      href="/tasks" className="btn btn-sm btn-secondary mx-2">
          Kembali
      </a>
      <button type="submit"
        className="btn btn-sm btn-primary"
      >
        Kirim</button>
    </form>
  )
}
  
export default TaskForm