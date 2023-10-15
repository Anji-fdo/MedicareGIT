import { axiosInstance } from "./axiosInstance";

// add 
export const AddSalary = async (payload) => {
  try {
    console.log()
    const response = await axiosInstance.post("/api/salary/add-salary", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get 
export const GetAllSalary = async () => {
  try {
    const response = await axiosInstance.get("/api/salary/get-all-salary");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update 
export const UpdateSalary = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/salary/update-salary/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete 
export const DeleteSalary = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/salary/delete-salary/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get member by id
export const GetSalaryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/salary/get-salary-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


