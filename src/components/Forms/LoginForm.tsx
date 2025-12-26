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
    <div className="min-h-screen w-full flex items-center justify-center bg-base-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
        <fieldset className="relative fieldset bg-base-200 border-base-300 rounded-box w-full border p-6 shadow-2xl">
          <legend className="fieldset-legend text-lg font-bold">Login</legend>

          <button
            type="button"
            data-testid="login-close"
            onClick={handleClose}
            className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-transform z-50"
            aria-label="Close login form"
          >
            <AiFillCloseCircle className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <div className="form-control w-full">
            <label className="label font-medium">Email</label>
            <input
              data-testid="login-email"
              name="email"
              type="email"
              className="input input-accent w-full h-12"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label font-medium">Password</label>
            <div className="relative">
              <input
                data-testid="login-password"
                name="password"
                type={passwordVisibility ? "text" : "password"}
                className="input input-accent w-full h-12 pr-12"
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
          </div>

          <div className="w-full pt-8">
            <button
              data-testid="login-submit"
              type="submit"
              className="btn btn-accent w-full h-12"
              disabled={isLoading}
            >
              <Loader show={isLoading} color="#ffffff">
                <span>Login</span>
              </Loader>
            </button>
          </div>

          <p className="text-center pt-6 opacity-70">
            Still don't have an account?
            <NavLink
              data-testid="to-register-link"
              to="/register"
              className="text-accent underline pl-2 font-bold"
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
