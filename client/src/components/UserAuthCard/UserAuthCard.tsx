import { LoginAuthCard } from "../LoginAuthCard/LoginAuthCard";
import { RegisterAuthCard } from "../RegisterAuthCard/RegisterAuthCard";

type UserAuthCardProps = {
  authType: "login" | "register";
};

export const UserAuthCard = (authType: UserAuthCardProps) => {
  return (
    <>
      {authType.authType === "login" ? <LoginAuthCard /> : <RegisterAuthCard />}
    </>
  );
};
