"use client";
 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from 'next/navigation'
import { fetchEmployee, updateEmployee } from "../../../api/employee";
import EmployeeForm from "../../../components/EmployeeForm"
 
const EditEmployee = () => {
  const {id}=useParams();
 
  const queryClient = useQueryClient();
  const router = useRouter();
 
  const {
    isLoading,
    isError,
    data: employee,
    error,
  } = useQuery({
    queryKey: ["employees", id],
    queryFn: () => fetchEmployee(id),
  });
 
  const updateEmployeeMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees']});
      router.push('/employees')
    }
  })
 
  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;
 
  const handleSubmit = (updatedEmployee) => {
    updateEmployeeMutation.mutate({id, ...updatedEmployee})
  }
 
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="flex items-center justify-between gap-1 mb-5 pl-10 pr-10">
            <h1 className="text-4xl font-bold"></h1>
        </div> 
        <div className="overflow-x-auto pt-10">
            <div className="flex items-center justify-between my-5">
                <div className="bg-light p-5 rounded">
                    <h2>Ubah Pegawai</h2>
                    <EmployeeForm onSubmit={handleSubmit} initialValue={employee.results} />
                </div>
            </div>
        </div>
    </div>
  )
}
  
export default EditEmployee