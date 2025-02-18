import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const getEmployees = () => {
  try {
    return API.get("/employees");
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeByID = (id) => {
  try {
    return API.get(`/employees/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const postEmployee = (payload) => {
  try {
    return API.post(`/employees`, payload);
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = (id) => {
  try {
    return API.delete(`/employees/${id}`);
  } catch (error) {
    console.log(error);
  }
};
