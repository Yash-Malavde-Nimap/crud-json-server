import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { postEmployee } from "../utils/APIServices";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AddDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    status: "",
    email: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Handle form submission logic here

    try {
      // if (formData.first_name == "") alert("Please Enter First Name");
      // if (formData.last_name == "") alert("Please Enter Last Name");
      // if (formData.gender == "") alert("Please Enter Gender");
      // if (formData.status == "") alert("Please Enter Status");
      // if (formData.email == "") alert("Please Enter Email");

      if (formData.email.length != "") {
        await postEmployee(formData);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} style={{position:'absolute',right:'280px'}}>
        Add Employee
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "#3f51b5" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              {/* <CloseIcon /> */}X
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Employee
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                formData.email != "" ? handleSubmit() : handleClose();
              }}
            >
              Add
            </Button>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="sm"
          style={{
            marginTop: "40px",
            padding: "20px 20px",
            backgroundColor: "#3f51b587",
            borderRadius: "8px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#3f51b5",
            }}
          >
            Employee Form
          </h2>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {/* First Name */}
            <TextField
              placeholder="Enter First Name"
              fullWidth
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
              }}
            />

            {/* Last Name */}
            <TextField
              placeholder="Enter Last Name"
              fullWidth
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
              }}
            />

            {/* Gender */}
            <FormControl
              // fullWidth
              style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
            >
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                // placeholder='Select Gender'
                value={formData.gender || ""}
                onChange={handleChange}
                style={{
                  borderRadius: "8px",
                }}
              >
                <MenuItem value="" disabled>
                  Select Gender
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            {/* Status */}
            <FormControl
              fullWidth
              style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{
                  borderRadius: "8px",
                }}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Terminated">Terminated</MenuItem>
                <MenuItem value="On Leave">On Leave</MenuItem>
                <MenuItem value="New">New</MenuItem>
              </Select>
            </FormControl>

            {/* Email */}
            <TextField
              placeholder="Enter Email"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
              }}
            />
          </form>
        </Container>
      </Dialog>
    </>
  );
}
