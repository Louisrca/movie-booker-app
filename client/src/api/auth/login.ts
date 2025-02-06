import { useMutation } from "@tanstack/react-query";
import { webApiCall } from "../utils/api";
import { useNavigate } from "react-router-dom";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type BackendErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

export type LoginResponse = {
  response: {
    token: string;
  };
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation<LoginResponse, BackendErrorResponse, LoginCredentials>({
    mutationFn: async (data) =>
      webApiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: (data) => {
      localStorage.setItem("token", data.response.token);
      navigate("/");
    },
  });
};
