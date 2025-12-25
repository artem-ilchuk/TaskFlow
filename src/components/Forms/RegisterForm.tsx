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
    <div className="min-h-screen w-full flex items-center justify-center bg-base-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md md:max-w-lg lg:max-w-xl"
        noValidate
      >
        <fieldset className="relative fieldset bg-base-200 border-base-300 rounded-box w-full border p-6 sm:px-8 md:px-10 lg:px-12 shadow-xl">
          <legend className="fieldset-legend text-lg md:text-xl lg:text-2xl font-bold">
            Registration
          </legend>

          <AiFillCloseCircle
            data-testid="register-close"
            onClick={handleClose}
            className="absolute top-1 right-3 w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 hover:text-red-700 transition-transform duration-200"
          />

          <div className="w-full">
            <label className="label text-base md:text-lg font-medium">
              Name
            </label>
            <input
              data-testid="register-name"
              name="name"
              type="text"
              className="input input-accent w-full h-12 md:h-14 text-lg"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-base mt-1 font-semibold">
                {errors.name}
              </p>
            )}
          </div>

          <div className="w-full mt-2">
            <label className="label text-base md:text-lg font-medium">
              Email
            </label>
            <input
              data-testid="register-email"
              name="email"
              type="email"
              className="input input-accent w-full h-12 md:h-14 text-lg"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-base mt-1 font-semibold">
                {errors.email}
              </p>
            )}
          </div>

          <div className="w-full mt-2">
            <label className="label text-base md:text-lg font-medium">
              Password
            </label>
            <div className="relative">
              <input
                data-testid="register-password"
                name="password"
                type={passwordVisibility ? "text" : "password"}
                className="input input-accent w-full h-12 md:h-14 text-lg"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <div className="scale-125 absolute right-4 top-1/2 -translate-y-1/2">
                <PasswordToggle
                  visible={passwordVisibility}
                  onClick={handlePasswordVisibility}
                />
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-base mt-1 font-semibold">
                {errors.password}
              </p>
            )}
          </div>

          <div className="w-full mt-4">
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                data-testid="policy-checkbox"
                name="accept"
                type="checkbox"
                className="checkbox checkbox-accent checkbox-md md:checkbox-lg rounded-md"
                checked={form.accept}
                onChange={handleChange}
                disabled={isLoading}
              />
              <span className="text-base md:text-lg leading-snug">
                I accept the terms of the
                <a
                  href="#"
                  className="text-blue-500 underline hover:text-blue-700 pl-2"
                >
                  Privacy Policy.
                </a>
              </span>
            </label>
            {errors.accept && (
              <p className="text-red-500 text-base mt-1 font-semibold">
                {errors.accept}
              </p>
            )}
          </div>

          <div className="w-full pt-8">
            <button
              data-testid="register-submit"
              type="submit"
              className="btn btn-accent w-full h-12 md:h-14 text-lg md:text-xl flex justify-center items-center cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
              disabled={isSubmitDisabled}
            >
              <Loader
                show={isLoading}
                height={20}
                width={4}
                color="#ffffff"
                delay={200}
              >
                <span className="text-xl">Register</span>
              </Loader>
            </button>
          </div>

          <p className="text-base md:text-lg text-center pt-8 text-base-content/70">
            Already have account?
            <NavLink
              data-testid="to-login-link"
              to="/login"
              className="pl-2 text-accent underline font-bold hover:text-accent-focus transition-colors"
            >
              Let's login!
            </NavLink>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default memo(RegisterForm);
