"use client";
 
import { useQuery } from "@tanstack/react-query"; //npm i @tanstack/react-query
import { useParams } from 'next/navigation'
import { fetchTask } from "../../api/task";

const ViewTask = () => {
 
  const {id}=useParams();
 
  const {
    isLoading,
    isError,
    data: task,
    error,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTask(id),
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
                    <h1 className="title">Detail Task</h1>
                    <hr />
                    <div className="mb-2 w-full text-right">
                      <label className="form-label">Nama Karyawan :</label> <p>{task.results.employee.name}</p>
                      <label className="form-label">Task Name :</label> <p>{task.results.task_name}</p>
                      <label className="form-label">Due Date :</label> <p>{task.results.due_date}</p>
                    </div>

                    <a
                    href="/tasks" className="btn btn-sm btn-secondary">
                        Kembali
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}
  
export default ViewTask