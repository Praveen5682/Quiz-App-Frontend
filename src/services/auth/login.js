import axiosInstance from "../axiosMiddleware";

export const login = async (data) => {
  try {
    const response = await axiosInstance.post("auth/login", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
