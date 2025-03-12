"use client";

import { useQuery } from "@tanstack/react-query"; 
import EmployeeList from "../components/EmployeeList";
import { getEmployeeList } from "@/app/api/employee";
import Paginationnumber from "../components/Paginationnumber";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";

export default function Employee() {
    const searchParams = useSearchParams()
    const page = searchParams.get('page')

    const currentPage = Number(page) || 1;

    const { isLoading, data, isError, isFetching,  error } = useQuery({
        queryKey: ["employees", currentPage],
        queryFn: () => getEmployeeList(currentPage)
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
                    <h2>Daftar Pegawai</h2>
                    <div className="mb-2 w-full text-right">
                        <Link
                        href="/employee/create"
                        className="text-white btn btn-sm btn-primary">
                            Tambah Pegawai
                        </Link>
                    </div>
                    <div className="table-responsive">
                        <EmployeeList employeelist={data.employeelist} />
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
