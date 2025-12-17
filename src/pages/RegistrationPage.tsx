import { FC } from "react";
import RegisterForm from "../components/Forms/RegisterForm";

const RegistrationPage: FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <RegisterForm />
    </main>
  );
};

export default RegistrationPage;
