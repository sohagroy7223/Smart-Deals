import { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {
  const { createUser, setUser, updateUserProfile, emailVerification } =
    use(AuthContext);
  const navigate = useNavigate();

  const handelRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(name, image, email, password);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
        emailVerification().then(() => {
          alert("please check your email and verified your email");
        });
        // console.log(user);
        const newUsers = {
          name: name,
          email: email,
          photo: image,
        };
        updateUserProfile({ displayName: name, photoURL: image })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: image });
          })
          .catch((error) => {
            console.log(error.message);
            setUser(user);
          });

        // create user in the database
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

  return (
    <div className="card bg-base-100 w-full mx-auto items-center mt-6 max-w-sm shrink-0 shadow-2xl">
      <h2 className="text-3xl font-bold">Register Now!</h2>
      <div className="card-body">
        <form onSubmit={handelRegister} className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            className="input"
            name="name"
            required
            autoComplete="username"
            placeholder="Your name"
          />
          <label className="label">Image-URL</label>
          <input
            type="text"
            className="input"
            name="image"
            required
            placeholder="Image url"
          />
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            name="email"
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
