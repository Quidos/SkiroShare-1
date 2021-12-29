import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Register = () => {
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 400,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <div className="login-wrapper">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Skiro Share</h2>
          </Grid>
          <TextField
            label="Email"
            placeholder="Enter Email"
            fullWidth
            required
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Password"
            placeholder="Re-enter password"
            type="password"
            fullWidth
            required
            sx={{ marginTop: 2 }}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Register
          </Button>

          <Typography>
            Already have an account ? <Link href="/login">Sign In</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;