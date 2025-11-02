import axiosInstance from "../axiosMiddleware";

export const GetStudents = async () => {
  try {
    const response = await axiosInstance.post("students/get-students");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
