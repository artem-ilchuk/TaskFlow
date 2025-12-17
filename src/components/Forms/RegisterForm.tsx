import { NavLink, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import { PasswordHide } from "../../hooks/usePasswordVisibility";
import { registerSchema } from "../../schemas/authSchemas";
import PasswordToggle from "../Common/PasswordToggle";
import { AiFillCloseCircle } from "react-icons/ai";

interface FormState {
  email: string;
  password: string;
  accept: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  accept?: string;
}

const createInitialState = (): FormState => ({
  email: "",
  password: "",
  accept: false,
});

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(createInitialState());
  const [errors, setErrors] = useState<FormErrors>({});
  const { passwordVisibility, handlePasswordVisibility } = PasswordHide();

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = registerSchema.safeParse(form);

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
    <form onSubmit={handleSubmit} noValidate>
      <fieldset className="relative fieldset bg-base-200 border-base-300 rounded-box  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border p-4 sm:px-6 md:px-8 lg:px-10">
        <legend className="fieldset-legend text-base">Registration</legend>

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

        <label className="flex items-center gap-5 pt-4 pb-4">
          <input
            name="accept"
            type="checkbox"
            className="checkbox checkbox-accent rounded-md w-5 h-5 cursor-pointer"
            checked={form.accept}
            onChange={handleChange}
          />
          <div className=" items-center text-s leading-snug">
            I accept the terms and conditions of the
            <a href="#" className="text-blue-400 underline pl-1">
              Privacy Policy.
            </a>
          </div>
        </label>
        {errors.accept && (
          <p className="text-red-500 text-sm">{errors.accept}</p>
        )}
        <button
          type="submit"
          className="btn btn-accent mt-4 cursor-pointer
             transform transition-all duration-200 ease-in-out
             hover:scale-105 hover:shadow-lg"
          disabled={!form.accept}
        >
          Register
        </button>

        <p className="text-s text-center pt-2">
          Already have account?
          <NavLink
            to="/login"
            className="pl-1 text-accent underline cursor-pointer"
          >
            Let`s login!
          </NavLink>
        </p>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
