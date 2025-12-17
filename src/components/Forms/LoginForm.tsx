import { NavLink, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import { PasswordHide } from "../../hooks/usePasswordVisibility";
import { loginSchema } from "../../schemas/authSchemas";
import PasswordToggle from "../Common/PasswordToggle";
import { AiFillCloseCircle } from "react-icons/ai";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const createInitialState = (): FormState => ({ email: "", password: "" });

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(createInitialState());
  const [errors, setErrors] = useState<FormErrors>({});
  const { passwordVisibility, handlePasswordVisibility } = PasswordHide();

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const formErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        formErrors[issue.path[0] as keyof FormErrors] = issue.message;
      });
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setForm(createInitialState());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto px-4"
      noValidate
    >
      <fieldset
        className="relative fieldset bg-base-200 border-base-300 rounded-box 
          w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto
          border p-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"
      >
        <legend className="fieldset-legend text-base">Login</legend>

        <AiFillCloseCircle
          onClick={() => navigate("/")}
          className="absolute top-0.5 right-2 w-5 h-5 md:w-6 md:h-6 cursor-pointer
             transition-transform duration-200 ease-in-out
             hover:scale-110 hover:text-red-700"
        />

        <label className="label">Email</label>
        <div className="relative">
          <input
            name="email"
            type="email"
            className="input input-accent w-full"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <label className="label">Password</label>
        <div className="relative">
          <input
            name="password"
            type={passwordVisibility ? "text" : "password"}
            className="input  input-accent w-full"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <PasswordToggle
            visible={passwordVisibility}
            onClick={handlePasswordVisibility}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
        <div className="w-full pt-4">
          <button
            type="submit"
            className="btn btn-accent w-full py-2 transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            Login
          </button>
        </div>

        <p className="text-s text-center pt-2">Still don`t have an account? </p>
        <NavLink
          to="/register"
          className="pl-1 text-accent  text-center underline cursor-pointer"
        >
          Let`s register!
        </NavLink>
      </fieldset>
    </form>
  );
};

export default LoginForm;
