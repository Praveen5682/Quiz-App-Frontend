import axiosInstance from "../axiosMiddleware";

export const GetGeneralLeaderboard = async () => {
  try {
    const response = await axiosInstance.post("quiz/leaderboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};
