"use client";

import { useQuery } from "@tanstack/react-query"; 
import TaskList from "../components/TaskList";
import { getTaskList } from "@/app/api/task";
import Paginationnumber from "../components/Paginationnumber";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";

export default function Task() {
    const searchParams = useSearchParams()
    const page = searchParams.get('page')

    const currentPage = Number(page) || 1;

    const { isLoading, data, isError, isFetching,  error } = useQuery({
        queryKey: ["tasks", currentPage],
        queryFn: () => getTaskList(currentPage)
    });

    if (isLoading) return "Loading...";
    if (isError) return `Error: ${error.message}`;

    const totalPages = Math.ceil(Number(data.totalpage) / Number(data.perpage));
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="flex items-center justify-between gap-1 mb-5 pl-10 pr-10">
            <h1 className="text-4xl font-bold"></h1>
        </div> 
        <div className="overflow-x-auto pt-10">
            <div className="flex items-center justify-between my-5">
                <div className="bg-light p-5 rounded">
                    <h2>Daftar Pekerjaan</h2>
                    <div className="mb-2 w-full text-right">
                        <Link
                        href="/tasks/create"
                        className="text-white btn btn-sm btn-primary">
                            Tambah Pekerjaan
                        </Link>
                    </div>
                    <div className="table-responsive">
                        <TaskList tasklist={data.tasklist} />
                    </div>
                    <nav className="Page navigation example my-2">
                        <Paginationnumber totalPages={totalPages} />
                        {isFetching ? <LoadingSpinner /> : null}
                    </nav>
                </div>
            </div>
        </div>
    </div>
  );
}
