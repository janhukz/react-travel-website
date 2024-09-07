import React from "react";
import { UserLayout } from "../../layouts/Userlayout";
import { SignForm } from "./SignInForm";

export const SignInPage: React.FC = () => {
  return (
    <UserLayout>
      <div>
        <SignForm></SignForm>
      </div>
      ;
    </UserLayout>
  );
};
