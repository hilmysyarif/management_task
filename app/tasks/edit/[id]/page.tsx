"use client";
 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from 'next/navigation'
import { fetchTask, updateTask } from "../../../api/task";
import TaskForm from "../../../components/TaskForm"
 
const EditTask = () => {
  const {id}=useParams();
 
  const queryClient = useQueryClient();
  const router = useRouter();
 
  const {
    isLoading,
    isError,
    data: task,
    error,
  } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => fetchTask(id),
  });
 
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks']});
      router.push('/tasks')
    }
  })
 
  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;
 
  const handleSubmit = (updatedTask) => {
    updateTaskMutation.mutate({id, ...updatedTask})
  }
 
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="flex items-center justify-between gap-1 mb-5 pl-10 pr-10">
            <h1 className="text-4xl font-bold"></h1>
        </div> 
        <div className="overflow-x-auto pt-10">
            <div className="flex items-center justify-between my-5">
                <div className="bg-light p-5 rounded">
                    <h2>Ubah Task</h2>
                    <TaskForm onSubmit={handleSubmit} initialValue={task.results} />
                </div>
            </div>
        </div>
    </div>
  )
}
  
export default EditTask