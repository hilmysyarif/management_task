"use client";

export default function Home() {
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="flex items-center justify-between gap-1 mb-5 pl-10 pr-10">
            <h1 className="text-4xl font-bold"></h1>
        </div> 
        <div className="overflow-x-auto pt-10">
            <div className="flex items-center justify-between my-5">
                <div className="bg-light p-5 rounded">
                    <h1>ETM - Employee Task Management</h1>
                    <a className="btn btn-lg btn-primary" href="/tasks" role="button">Pekerjaan</a>
                </div>
            </div>
        </div>
    </div>
  );
}
