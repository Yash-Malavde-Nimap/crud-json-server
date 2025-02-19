import axios from "axios";

// AXIOS INSTANCE
const API = axios.create({
  baseURL: "http://localhost:3000",
});


// GET ALL THE EMPLOYEES DATA
export const getEmployees = () => {
  try {
    return API.get("/employees");
  } catch (error) {
    console.log(error);
  }
};


// GET EMPLOYEE DATA FROM ID
export const getEmployeeByID = (id) => {
  try {
    return API.get(`/employees/${id}`);
  } catch (error) {
    console.log(error);
  }
};


// POST A NEW EMPLOYEE
export const postEmployee = (payload) => {
  try {
    return API.post(`/employees`, payload);
  } catch (error) {
    console.log(error);
  }
};


// DELETE EXISTING EMPLOYEE
export const deleteEmployee = (id) => {
  try {
    return API.delete(`/employees/${id}`);
  } catch (error) {
    console.log(error);
  }
};


// EDIT AN EMPLOYEES DETAILS
export const putEmployee = (id,payload) => {
  try {
    return API.put(`/employees/${id}`, payload);
  } catch (error) {
    console.log(error);
  }
};