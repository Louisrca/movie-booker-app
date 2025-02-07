import { jwtDecode } from "jwt-decode";

export const decodeJwt = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken: { email: string; userId: string } = jwtDecode(token);
      return decodedToken?.userId;
    } catch (error) {
      console.error("Erreur lors du décodage du JWT", error);
      return "";
    }
  }
  return "";
};
