import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "../api/employee";
import { useRouter } from 'next/navigation'

const EmployeeList = ({ employeelist }) => { 
    const queryClient = useQueryClient();
    const router = useRouter();

    const deleteEmployeeMutation = useMutation({
      mutationFn: deleteEmployee,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['employees']});
      }
    });
 
    const handleDelete = (id) => {
        deleteEmployeeMutation.mutate(id)
        router.push('/employees')
    }
  return (
    <>
        <table className="table table-hover table-bordered">
            <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Posisi</th>
                    <th width="50%">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {employeelist.map((item) => (
                    <tr key={item.id}>
                        <td className="py-3">
                            {item.id}
                        </td>
                        <td className="py-3 px-6">{item.name}</td>   
                        <td className="py-3 px-6">{item.position}</td>
                        <td className="flex justify-center">
                            <Link className="text-white btn btn-sm btn-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                href={`/employees/${item.id}`}>Lihat</Link> 
                             
                            <Link className="focus:outline-none text-white btn btn-sm btn-warning focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                href={`/employees/edit/${item.id}/`}>
                                Ubah
                            </Link>
                            <button onClick={() => handleDelete(item.id)}  className="focus:outline-none text-white btn btn-sm btn-danger focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                Hapus</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}
 
export default EmployeeList