"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query"
import TaskForm from "../../components/TaskForm"
import { createTask } from "../../api/task"
import { useRouter } from 'next/navigation'

const AddTask= () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createUserMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks']});
      router.push('/tasks')
    }
  });
 
  const handleAddPost = (task) => {
    createUserMutation.mutate({
      ...task
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
                    <h2>Tambah Pekerjaan</h2>
                    <TaskForm onSubmit={handleAddPost} initialValue={{}} />
                </div>
            </div>
        </div>
    </div>
  )
}
  
export default AddTask