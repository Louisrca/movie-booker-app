import {
  Box,
  CardContent,
  CardHeader,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useLogin } from "../../api/auth/login";

export const LoginAuthCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "35ch" } }}
      autoComplete="off"
      onSubmit={handleLogin}
    >
      <CardContent>
        <CardHeader
          title="Login"
          sx={{
            "& .css-16xl4zq-MuiTypography-root": {
              fontSize: "2rem",
              fontWeight: "900",
            },
          }}
        />
      </CardContent>
      {login.isError && (
        <span style={{ color: "red" }}>{login.error.message}</span>
      )}
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          id="outlined-basic"
          placeholder="Email"
          label="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          placeholder="Password"
          label="Password"
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </CardContent>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <button type="submit">
          {login.isLoading ? (
            <CircularProgress size={14} color="inherit" />
          ) : (
            "Register"
          )}{" "}
        </button>
        <a href="/register">Create an account?</a>
      </CardContent>
    </Box>
  );
};
