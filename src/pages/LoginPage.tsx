import { FC } from "react";
import LoginForm from "../components/Forms/LoginForm";

const LoginPage: FC = () => {
  return (
    <main className="h-[50vh] flex items-center justify-center px-4">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
