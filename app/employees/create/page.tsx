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
      router.push('/employees')
    }
  });
 
  const handleAddPost = (employee) => {
    createUserMutation.mutate({
      ...employee
    })
  }
   
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="flex items-center justify-between gap-1 mb-5 pl-10 pr-10">
            <h1 className="text-4xl font-bold"></h1>
        </div> 
        <div className="overflow-x-auto pt-10">
            <div className="flex items-center justify-between my-5">
                <div className="bg-light p-5 rounded">
                    <h2>Tambah Pegawai</h2>
                    <EmployeeForm onSubmit={handleAddPost} initialValue={{}} />
                </div>
            </div>
        </div>
    </div>
  )
}
  
export default AddEmployee