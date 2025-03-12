"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query"
import EmployeeForm from "../../components/EmployeeForm"
import { createEmployee } from "../../api/employee"
import { useRouter } from 'next/navigation'

const AddEmployee= () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createUserMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees']});
      //console.log("success!")
      router.push('/')
    }
  });
 
  const handleAddPost = (employee) => {
    createUserMutation.mutate({
      ...employee
    })
  }
   
  return (
    <div className="max-w-md mx-auto mt-5 mb-5">
      <h1 className="text-2xl text-center mb-2">Add New Employee</h1>
      <EmployeeForm onSubmit={handleAddPost} initialValue={{}} />
    </div>
  )
}
  
export default AddEmployee