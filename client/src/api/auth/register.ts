import { useMutation } from "@tanstack/react-query";
import { webApiCall } from "../utils/api";
import { useNavigate } from "react-router-dom";

export type RegisterCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type BackendErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

export type RegisterResponse = {
  response: {
    token: string;
  };
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation<
    RegisterResponse,
    BackendErrorResponse,
    RegisterCredentials
  >({
    mutationFn: async (data) =>
      webApiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: () => {
      navigate("/login");
    },
  });
};
