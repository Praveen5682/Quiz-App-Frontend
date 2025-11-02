import axiosInstance from "../axiosMiddleware";

export const Registeration = async (data) => {
  try {
    const response = await axiosInstance.post("auth/register", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
