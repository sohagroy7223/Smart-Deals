import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { loginUser } = use(AuthContext);
  // console.log(loginUser);

  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto items-center mt-20 max-w-sm shrink-0 shadow-2xl">
      <h2 className="text-3xl font-bold">Login now!</h2>
      <div className="card-body">
        <form onSubmit={handelLogin} className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            name="email"
            autoComplete="email"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <p>
          don't have an account?
          <Link className="text-blue-600 font-semibold" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
