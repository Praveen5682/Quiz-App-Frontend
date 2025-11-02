import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetStudents } from "../../services/users/GetStudents";

const StudentsPage = () => {
  const {
    data: studentsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["students"],
    queryFn: GetStudents,
  });

  const students = studentsData?.students || [];

  if (isLoading) return <p>Loading students...</p>;
  if (isError) return <p>Failed to load students.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Students List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-6 py-3 text-left">#</th>
              <th className="border px-6 py-3 text-left">Full Name</th>
              <th className="border px-6 py-3 text-left">Email</th>
              <th className="border px-6 py-3 text-left">Role</th>
              <th className="border px-6 py-3 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.userid}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-6 py-3">{index + 1}</td>
                <td className="border px-6 py-3">{student.fullname}</td>
                <td className="border px-6 py-3">{student.email}</td>
                <td className="border px-6 py-3">{student.role}</td>
                <td className="border px-6 py-3">
                  {new Date(student.createdat).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;
