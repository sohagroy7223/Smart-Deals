import { use, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { loginUser, signInWithGoogle, resetPassword } = use(AuthContext);
  // console.log(loginUser);
  const emailRef = useRef();
  const navigate = useNavigate();

  const handelGoogleLogin = () => {
    signInWithGoogle();
    navigate("/")
      .then((result) => {
        // console.log(result.user);
        const newUsers = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        // send user in database

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUsers),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("after save user data in database", data);
            data;
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    loginUser(email, password)
      .then((result) => {
        // console.log(result.user);
        result;
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelResetPassword = () => {
    const email = emailRef.current.value;
    resetPassword(email).then(() => {
      alert("we send reset password mail, please check your email");
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
            ref={emailRef}
            required
            autoComplete="email"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Password"
          />
          <div>
            <a onClick={handelResetPassword} className="link link-hover">
              Forgot password?
            </a>
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
      <button
        onClick={handelGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
