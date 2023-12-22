import { Link } from "react-router-dom";
import AddTodo from "../components/AddTodo";
import useAuth from "../hooks/useAuth";
import AllTasks from "../components/AllTasks";

const Dashboard = () => {
  const { user } = useAuth();

  //   console.log(user?.displayName);
  //   console.log(user);

  return (
    <div>
      <div className=" w-full justify-between max-w-[1280px] mx-auto my-5">
        <div className="lg:mx-2   ">
          <div className="  md:rounded-2xl  bg-blue-300  ">
            <h3 className="text-center text-2xl font-bold ">Dashboard </h3>
            <div className=" flex items-center justify-between">
              <h3 className="text-2xl ml-8 font-medium flex justify-center h-full ">
                {user?.displayName}
              </h3>
              <img
                className="w-20 h-20 rounded-full"
                src={user?.photoURL}
                alt=""
              />
            </div>
            <div className="w-full items-center flex justify-center">
              <Link to={"/createTodo"}>
                <button className="group relative min-h-[50px] w-40 rounded-lg  font-bold  overflow-hidden border border-purple-500 bg-white text-purple-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-purple-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-purple-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
                  <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-purple-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-purple-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                  <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">
                    Add Task
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-2 w-full ">
          <AllTasks></AllTasks>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
