import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import { AuthContext } from "../firebase/AuthProvider";

const Navbar = () => {

const { user, logOut } = useContext(AuthContext)
  console.log(user);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className="text-2xl font-Cormorant font-medium rounded-xl p-3"
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color:isActive ?  'white': "" ,
            backgroundColor: isActive ? "#786fee" : "",
          };
        }}
      >
        Home
      </NavLink>

      <NavLink
        className="text-2xl font-Cormorant  font-medium rounded-xl p-3"
        to="/taskManageDashboard"
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color:isActive ?  'white': "" ,
            backgroundColor: isActive ? "#786fee" : "",
          };
        }}
      >
        TODO
      </NavLink>

      <NavLink
        className="text-2xl font-Cormorant  font-medium rounded-xl p-3"
        to="/profile"
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color:isActive ?  'white': "" ,
            backgroundColor: isActive ? "#786fee" : "",
          };
        }}
      >
        Profile 
      </NavLink>
     
    </>
  );
 
  
  const handleSignOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.error(error);
      });
  };

  




  return (
    <div>
     <div className="max-w-full md:max-w-full">
      <div className="navbar bg-neutral-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <h3
            id="logoName"
            className=" text-4xl  md:text-4xl md:font-medium text-[#786fee]  my-4"
          >
            Planify{" "}
          </h3>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end md:flex justify-center items-center text-center ">
          
          {user ? (
            <>
             {
              user?.photoURL ? <img className="w-[60px] h-[50px] md:w-12 rounded-full  md:mr-3" src={user.photoURL} alt="" /> 
               
              
              :
              <img className="rounded-full w-10  mr-1 md:mr-3" src="https://i.ibb.co/WHrCzF1/user.png" alt="" />
             } 
             
             <div className="md:flex justify-center items-center ">
             <div className="text-lg font-bold font-Cormorant">{user.displayName}</div>
              <div>
              <button className="btn font-Cormorant font-bold" onClick={handleSignOut}>Sign Out
             </button>
              </div>
             </div>
            </>
          ) : (
            <div>
              <NavLink
                className="text-2xl font-Cormorant rounded-xl p-3"
                to="/login"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    backgroundColor: isActive ? "#786fee" : "",
                  };
                }}
              >
                Login
              </NavLink>
            </div>
         )} 
        </div>
      </div>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Navbar;
