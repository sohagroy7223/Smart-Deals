import { Link } from "react-router";

const Register = () => {
  return (
    <div className="card bg-base-100 w-full mx-auto items-center mt-12 max-w-sm shrink-0 shadow-2xl">
      <h2 className="text-3xl font-bold">Register Now!</h2>
      <div className="card-body">
        <form className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            className="input"
            name="name"
            placeholder="Your name"
          />
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            name="email"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Password"
          />
          <button className="btn btn-neutral mt-4">Register</button>
        </form>
        <p>
          don't have an account?
          <Link className="text-blue-600 font-semibold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
