import {
  Box,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useRegister } from "../../api/auth/register";
import { useState } from "react";

export const RegisterAuthCard = () => {
  const register = useRegister();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register.mutate({ email, password, firstName, lastName });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: 1,
          width: "35ch",
        },
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <CardContent>
        <CardHeader
          title="Register"
          sx={{
            "& .css-16xl4zq-MuiTypography-root": {
              fontSize: "2rem",
              fontWeight: "900",
            },
          }}
        />
      </CardContent>
      {register.isError && (
        <CardContent
          sx={{
            color: "red",
            fontSize: "0.8rem",
            maxWidth: "22rem",
            textAlign: "left",
            padding: "0 1.5rem",
          }}
        >
          {register.error.message}
        </CardContent>
      )}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <TextField
          id="outlined-basic"
          placeholder="Firstname"
          required
          label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          placeholder="Lastname"
          required
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          placeholder="email"
          required
          label="Email"
          type="mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          placeholder="Password"
          required
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </CardContent>

      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <button type="submit">
          {register.isLoading ? (
            <CircularProgress size={14} color="inherit" />
          ) : (
            "Register"
          )}{" "}
        </button>
        <a href="/login">Already register?</a>
      </CardContent>
    </Box>
  );
};
