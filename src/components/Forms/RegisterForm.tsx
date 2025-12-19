import React, { useCallback, memo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";

import { PasswordHide } from "../../hooks/usePasswordVisibility";
import { registerSchema } from "../../schemas/authSchemas";
import { registerThunk } from "../../redux/auth/operations";
import { selectIsRegistering } from "../../redux/auth/selectors";
import { useAuthForm } from "../../hooks/useAuthForm";
import { AppDispatch } from "../../redux/store";

import PasswordToggle from "../Common/PasswordToggle";
import Loader from "../Common/Loader";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsRegistering);
  const { passwordVisibility, handlePasswordVisibility } = PasswordHide();

  const { form, errors, handleChange, handleSubmit } = useAuthForm({
    initialState: { name: "", email: "", password: "", accept: false },
    schema: registerSchema,
    onSubmit: async (values) => {
      const { name, email, password } = values;
      await dispatch(registerThunk({ name, email, password })).unwrap();
      navigate("/dashboard");
    },
  });

  const handleClose = useCallback(() => navigate("/"), [navigate]);

  const isSubmitDisabled = isLoading || !form.accept;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset className="relative fieldset bg-base-200 border-base-300 rounded-box max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border p-4 sm:px-6 md:px-8 lg:px-10">
        <legend className="fieldset-legend text-base">Registration</legend>

        <AiFillCloseCircle
          onClick={handleClose}
          className="absolute top-0.5 right-2 w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:scale-110 hover:text-red-700 transition-transform duration-200"
        />

        <label className="label">Name</label>
        <input
          name="name"
          type="text"
          className="input input-accent w-full"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <label className="label">Email</label>
        <input
          name="email"
          type="email"
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

        <label className="flex items-center gap-5 pt-4 pb-4">
          <input
            name="accept"
            type="checkbox"
            className="checkbox checkbox-accent rounded-md w-5 h-5 cursor-pointer"
            checked={form.accept}
            onChange={handleChange}
            disabled={isLoading}
          />
          <div className="text-s leading-snug">
            I accept the terms and conditions of the{" "}
            <a href="#" className="text-blue-400 underline">
              Privacy Policy.
            </a>
          </div>
        </label>
        {errors.accept && (
          <p className="text-red-500 text-sm">{errors.accept}</p>
        )}

        <button
          type="submit"
          className="btn btn-accent mt-4 w-full flex justify-center items-center cursor-pointer hover:scale-105 hover:shadow-lg transition-transform duration-200"
          disabled={isSubmitDisabled}
        >
          <Loader
            show={isLoading}
            height={15}
            width={3}
            color="#ffffff"
            delay={200}
          >
            Register
          </Loader>
        </button>

        <p className="text-s text-center pt-2">
          Already have account?{" "}
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

export default memo(RegisterForm);
