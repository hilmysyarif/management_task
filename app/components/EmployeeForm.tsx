"use client";

import { useState } from "react"
  
const EmployeeForm = ({ onSubmit, initialValue }) => {
  const [employee, setEmployee] = useState({
    name: initialValue.name || "",
    position: initialValue.position || ""
  });
  const handleChangeInput = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    })
  }
  
  const renderField = (label) => (
    <div>
      <label className="form-label">{label}</label>
      <input onChange={handleChangeInput} type="text" name={label.toLowerCase()} value={employee[label.toLowerCase()]} 
        className="form-control"
      />
    </div>
  );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employee);
    setEmployee({
      name: "",
      position: ""
    })
  
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">{renderField('Name')}</div>
      <div className="mb-5">{renderField('Position')}</div>
      <a
      href="/employees" className="btn btn-sm btn-secondary mx-2">
          Kembali
      </a>
      <button type="submit"
        className="btn btn-sm btn-primary"
      >
        Kirim</button>
    </form>
  )
}
  
export default EmployeeForm