import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetGeneralLeaderboard } from "../../services/quiz/GetGeneralLeaderboard";

const TeacherLeaderBoard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["generalLeaderboard"],
    queryFn: GetGeneralLeaderboard,
  });

  if (isLoading)
    return <p className="text-center mt-8">Loading leaderboard...</p>;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-600">
        Error loading leaderboard.
      </p>
    );

  const leaderboard = data?.leaderboard || [];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>

      {leaderboard.length === 0 ? (
        <p className="text-gray-500">No leaderboard data available.</p>
      ) : (
        <div className="space-y-2">
          {leaderboard.map((student, idx) => (
            <div
              key={student.userid}
              className="flex justify-between p-4 bg-white rounded shadow"
            >
              <span className="font-semibold">
                {idx + 1}. {student.fullname}
              </span>
              <span className="font-bold text-indigo-600">
                {student.totalScore}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherLeaderBoard;
