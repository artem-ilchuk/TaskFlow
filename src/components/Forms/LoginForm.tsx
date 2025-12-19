import { NavLink, useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import { PasswordHide } from "../../hooks/usePasswordVisibility";
import { loginSchema } from "../../schemas/authSchemas";
import PasswordToggle from "../Common/PasswordToggle";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/auth/operations";
import { AppDispatch, RootState } from "../../redux/store";
import Loader from "../Common/Loader";
import { useAuthForm } from "../../hooks/useAuthForm";
import { selectIsAuthLoading } from "../../redux/auth/selectors";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsAuthLoading);
  const { passwordVisibility, handlePasswordVisibility } = PasswordHide();

  const { form, errors, handleChange, handleSubmit } = useAuthForm({
    initialState: { email: "", password: "" },
    schema: loginSchema,
    onSubmit: async (values) => {
      await dispatch(loginThunk(values)).unwrap();
      navigate("/dashboard");
    },
  });

  const handleClose = useCallback(() => navigate("/"), [navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto px-4"
      noValidate
    >
      <fieldset className="relative fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md mx-auto border p-4 sm:px-6 md:px-8 lg:px-10">
        <legend className="fieldset-legend text-base">Login</legend>

        <AiFillCloseCircle
          onClick={handleClose}
          className="absolute top-0.5 right-2 w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:scale-110 hover:text-red-700 transition-transform duration-200"
        />

        <label className="label">Email</label>
        <input
          name="email"
          type="email"
          autoComplete="username"
          className="input input-accent w-full"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <label className="label">Password</label>
        <div className="relative">
          <input
            name="password"
            type={passwordVisibility ? "text" : "password"}
            autoComplete="current-password"
            className="input input-accent w-full"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          <PasswordToggle
            visible={passwordVisibility}
            onClick={handlePasswordVisibility}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <button
          type="submit"
          className="btn btn-accent w-full mt-4 flex justify-center items-center cursor-pointer hover:scale-105 hover:shadow-lg transition-transform duration-200"
          disabled={isLoading}
        >
          <Loader
            show={isLoading}
            height={15}
            width={3}
            color="#ffffff"
            delay={200}
          >
            Login
          </Loader>
        </button>

        <p className="text-s text-center pt-2">
          Still don`t have an account?
          <NavLink to="/register" className="text-accent underline pl-1">
            Let`s register!
          </NavLink>
        </p>
      </fieldset>
    </form>
  );
};

export default React.memo(LoginForm);
