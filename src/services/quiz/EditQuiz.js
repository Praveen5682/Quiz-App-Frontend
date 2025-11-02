import axiosInstance from "../axiosMiddleware";

export const EditQuiz = async (quizdata) => {
  try {
    const response = await axiosInstance.post("quiz/edit-quiz", quizdata);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
