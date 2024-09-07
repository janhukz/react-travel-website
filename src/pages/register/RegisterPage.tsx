import React from "react";
import { UserLayout } from "../../layouts/Userlayout";
import { RegisterForm } from "./RegisterForm";
export const RegisterPage: React.FC = () => {
  return (
    <UserLayout>
      <div>
        <RegisterForm></RegisterForm>
      </div>
      ;
    </UserLayout>
  );
};
