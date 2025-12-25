import { NavLink, useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import { PasswordHide } from "../../hooks/usePasswordVisibility";
import { loginSchema } from "../../schemas/authSchemas";
import PasswordToggle from "../Common/PasswordToggle";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
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
    <div className="min-h-screen w-full flex items-center justify-center bg-base-100 px-4 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md md:max-w-lg lg:max-w-xl"
        noValidate
      >
        <fieldset className="relative fieldset bg-base-200 border-base-300 rounded-box w-full border p-6 sm:px-8 md:px-10 lg:px-12 shadow-2xl">
          <legend className="fieldset-legend text-lg md:text-xl lg:text-2xl font-bold">
            Login
          </legend>

          <AiFillCloseCircle
            data-testid="login-close"
            onClick={handleClose}
            className="absolute top-1 right-3 w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:scale-110 hover:text-red-700 transition-transform duration-200"
          />

          <div className="w-full">
            <label className="label text-base md:text-lg font-medium">
              Email
            </label>
            <input
              data-testid="login-email"
              name="email"
              type="email"
              autoComplete="username"
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

          <div className="w-full mt-4">
            <label className="label text-base md:text-lg font-medium">
              Password
            </label>
            <div className="relative pb-1">
              <input
                data-testid="login-password"
                name="password"
                type={passwordVisibility ? "text" : "password"}
                autoComplete="current-password"
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

          <div className="w-full pt-8">
            <button
              data-testid="login-submit"
              type="submit"
              className="btn btn-accent w-full h-12 md:h-14 text-6xl md:text-xl flex justify-center items-center cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
              disabled={isLoading}
            >
              <Loader
                show={isLoading}
                height={20}
                width={4}
                color="#ffffff"
                delay={200}
              >
                <span className="text-xl">Login</span>
              </Loader>
            </button>
          </div>

          <p className="text-base md:text-lg text-center pt-8 text-base-content/70">
            Still don't have an account?
            <NavLink
              data-testid="to-register-link"
              to="/register"
              className="text-accent underline pl-2 font-bold hover:text-accent-focus transition-colors"
            >
              Let's register!
            </NavLink>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default React.memo(LoginForm);
