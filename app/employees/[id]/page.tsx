"use client";
 
import { useQuery } from "@tanstack/react-query"; //npm i @tanstack/react-query
import { useParams } from 'next/navigation'
import { fetchEmployee } from "../../api/employee";

const ViewEmployee = () => {
 
  const {id}=useParams();
 
  const {
    isLoading,
    isError,
    data: employee,
    error,
  } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => fetchEmployee(id),
  });
  
  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;
  
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="flex items-center justify-between gap-1 mb-5 pl-10 pr-10">
            <h1 className="text-4xl font-bold"></h1>
        </div> 
        <div className="overflow-x-auto pt-10">
            <div className="flex items-center justify-between my-5">
                <div className="bg-light p-5 rounded">
                    <h1 className="title">Detail Pegawai</h1>
                    <hr />
                    <div className="mb-2 w-full text-right">
                      <label className="form-label">Nama :</label> <p>{employee.results.name}</p>
                      <label className="form-label">Posisi :</label> <p>{employee.results.position}</p>
                    </div>

                    <a
                    href="/employees" className="btn btn-sm btn-secondary">
                        Kembali
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}
  
export default ViewEmployee