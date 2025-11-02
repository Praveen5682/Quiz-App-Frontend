import axiosInstance from "../axiosMiddleware";

export const CreateQuestions = async (quizdata) => {
  try {
    const response = await axiosInstance.post("quiz/create-quiz", quizdata);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
