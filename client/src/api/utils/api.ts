export type BackendErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

const makeApiCall = async (input: RequestInfo | URL, init: RequestInit) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    const errorData: BackendErrorResponse = await response.json();
    throw new Error(errorData.message || "Une erreur est survenue");
  }

  return response.json();
};

export const webApiCall = (pathname: RequestInfo | URL, init: RequestInit) => {
  const JWT_TOKEN = localStorage.getItem("token");

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

  return makeApiCall(`${API_URL}${pathname}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
};
