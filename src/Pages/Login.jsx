import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useContext } from "react";


import toast from "react-hot-toast"; 
import { signInWithPopup } from "firebase/auth"; 
import { AuthContext } from "../firebase/AuthProvider";
import SocialLogin from "../components/SocialLogin";
 


const Login = () => {
  
  const {signIn}  = useContext(AuthContext);
  // console.log(auth , googleSignIn);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

 
  

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    
    try {
      const result = await signIn(email, password);
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User login successful",
        showClass: {
          popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
        },
        hideClass: {
          popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
        },
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      // Display the error using toast or any other notification component
      toast.error(error.message || "Login failed");
    }
  };
  
  

  






    return (
        <div  className="w-full border-2 border-blue-600 h-screen justify-center flex items-center bg-[url('https://i.ibb.co/tpzYVg3/5153829.jpg')]  bg-base-200">
        <div className="">
        
          <div className="flex justify-center items-center gap-5 ">
          <div className="text-center hidden md:block lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            
          </div>
             <div className="card md:w-[400px] md:h-[400px] shadow-2xl bg-base-100">
            <form
             onSubmit={handleLogin}
              className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
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
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

             
              {/* <div className="form-control mt-6"> */}
               
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary "
                />
              
            </form>
            <h3 className="px-6">
              New here? <Link to={"/signup"} className="font-bold">Create a new account</Link>{" "}
            </h3>
            
            <div className=" justify-center text-center items-center  w-full select-none rounded-lg bg-gradient-to-tr from-blue-500 to-[#92e1f6]  align-middle font-sans text-xs font-bold uppercase text-black shadow-md   transition-all hover:shadow-lg mt-8 hover:shadow-[#92e1f6]  flex">
             
            <SocialLogin></SocialLogin>
           </div>
          </div>
          </div>
         
        </div>
      </div>
    );
};

export default Login;