import React from "react";
const LoginForm = () => {
  return (
    <div className={s.redir}>
      <p className={s.signinText}>Still don`t have an account? </p>
      <Link className={s.link} to="/register">
        Let`s register!
      </Link>
    </div>
  );
};

export default LoginForm;
