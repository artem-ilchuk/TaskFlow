// import { useDispatch } from "react-redux";
// import { loginThunk } from "../../redux/auth/operations";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const [form, setForm] = useState({ email: "", password: "", accept: false });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!result.success) {
      const formErrors = {};
      result.error.issues.forEach((issue) => {
        formErrors[issue.path[0]] = issue.message;
      });
      setErrors(formErrors);
      return;
    }

    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          name="email"
          type="email"
          className="input"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <label className="label">Password</label>
        <input
          name="password"
          type="password"
          className="input"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <label className="">
          <input
            name="accept"
            type="checkbox"
            className="checkbox checkbox-accent"
            checked={form.accept}
            onChange={handleChange}
          />
          <span className="">
            I accept the terms and conditions of the
            <a href="#" className="">
              Privacy Policy.
            </a>
          </span>
        </label>
        {errors.accept && (
          <p className="text-red-500 text-sm">{errors.accept}</p>
        )}
        <button
          type="submit"
          className="btn btn-accent mt-4"
          disabled={!form.accept}
        >
          Register
        </button>

        <p className="">
          Already have account?
          <Link className="" to="/login">
            Let`s login!
          </Link>
        </p>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
