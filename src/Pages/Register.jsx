import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/AuthProvider";

import { FcGoogle} from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithPopup, updateProfile } from "firebase/auth";
import SocialLogin from "../components/SocialLogin";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
 
  const { createUser, auth  } = useContext(AuthContext);
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/";
const axiosPublic = useAxiosPublic()
 const [registerError ,setRegisterError] = useState('')
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photoUrl = form.get("photoUrl");
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, name, photoUrl, password);


    if(password.length < 6){
      setRegisterError('Password should be at least 6 characters')
      return
    }
   
    // else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&?*]).{6,}$/.test(password)){
    //   setRegisterError('Password should have at least one special character')
    //   return
    // }

    else if(!/[\W_]/.test(password)){
      setRegisterError('Password should have at least one special character')
      return
    }
    


    
    
    setRegisterError('')

    //CREATE USER

    createUser(email, password)
      .then((result) => {
        console.log(result);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoUrl,
        })
        .then(result )
        console.log(result);
        const userInfo = {
          email: result.user?.email,
          name: name,
          role: 'user'
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);

          navigate("/");
        });
          toast("Registration complete!");
          e.target.reset()
          navigate(from, { replace: true });
        
      })
      .catch((error) => {
        setRegisterError(error.message)
        console.error(error);
      });


  };

  
  // const handleGoogleLogin = () => {
  //   signInWithPopup(auth, googleLogin)
  //     .then((result) => {
  //       toast("Welcome back");
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };


  return (
    <div>
      <div className="h-full md:w-1/2 lg:w-1/3 mx-auto">
        <h2 className="text-4xl font-bold text-center mt-28">
          Please Register.
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered"
            />

            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photoUrl"
              placeholder="Photo URL"
              className="input input-bordered"
            />

            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn  select-none rounded-lg bg-gradient-to-tr from-blue-500 to-[#92e1f6]  align-middle font-sans text-xs font-bold uppercase text-black shadow-md   transition-all hover:shadow-lg mt-8 hover:shadow-[#92e1f6] ">Register</button>
          </div>
        </form>
        {
          registerError && <p className="flex justify-center items-center text-center text-xl font-semibold text-red-600 mb-5">{registerError} </p>
          }
        <p className="text-center text-lg ">
          Already have an account? Please{" "}
          <Link className="font-bold text-lg " to="/login">
            Login
          </Link>{" "}
        </p>

      </div>

      <div  className="w-full">
      <div className="flex justify-center items-center">
        
          <SocialLogin></SocialLogin>
      
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
