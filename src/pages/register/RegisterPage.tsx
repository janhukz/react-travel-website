import React from "react";
import { UserLayout } from "../../layouts/userlayout";
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
