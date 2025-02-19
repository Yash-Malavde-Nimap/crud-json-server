/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  deleteEmployee,
  getEmployeeByID,
  getEmployees,
} from "../utils/APIServices";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { AddDialog } from "./AddDialog.jsx";
import { EditDialog } from "./EditDialog.jsx";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [id, setID] = useState("");

  const getEMP = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  const getByID = async () => {
    const res = await getEmployeeByID(id);
    setEmployees([res.data]);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    // window.location.reload()
    getEMP();
  };

  const filteredEmployees = id
    ? employees.filter((employee) => employee.id === id)
    : employees;

  useEffect(() => {
    getEMP();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (id) {
        getByID();
      }
    }, 500);

    if (id === "") {
      getEMP();
    }

    return () => {
      clearInterval(timer);
    };
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        gap: "20px",
        padding: "30px 0px",
        backgroundColor: "#e0e0e04d",
        borderRadius: "8px",
        scrollBehavior: "smooth",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap:'wrap',
          alignItems: "center",
          gap: "10px",
          width: "600px",
        }}
      >
        <TextField
          value={id}
          onChange={(e) => setID(e.target.value)}
          variant="standard"
          placeholder="Enter Employee ID (Number)"
          fullWidth
          style={{
            padding: "16px 20px",
            backgroundColor: "#c6c6c6",
            borderRadius: "8px",
            maxWidth: "300px",
            position: "sticky",
            color: "white",
          }}
        />

        {/* THIS IS A BUTTON THAT TOGGLES THE MODAL/DIALOGBOX */}
        <AddDialog />
      </div>

      <TableContainer
        component={Paper}
        elevation={3}
        style={{ borderRadius: "8px", maxWidth: "1000px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#3f51b5", color: "#ffffff" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                ID
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                First Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Last Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Email
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Gender
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Status
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", color: "white" }}
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ flexDirection: "column-reverse" }}>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp, index) => (
                <TableRow
                  key={emp.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff", // Alternating row colors
                    transition: "background-color 0.3s", // Smooth transition on hover
                  }}
                  hover
                >
                  <TableCell>{emp.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {emp.first_name}
                  </TableCell>
                  <TableCell>{emp.last_name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.gender}</TableCell>
                  <TableCell>{emp.status}</TableCell>
                  <TableCell
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    {/* <Button
                      variant="contained"
                      style={{ fontSize: "10px", background: "blue" }}
                    >
                      Edit
                    </Button> */}
                    <EditDialog emp={emp} employees={employees}/>
                    <Button
                      variant="contained"
                      style={{ fontSize: "10px", background: "red" }}
                      onClick={() => {
                        handleDelete(emp.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  style={{ color: "#ff5722", fontStyle: "italic" }}
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Employee;
