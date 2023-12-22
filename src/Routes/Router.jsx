import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import TaskManagementDashboard from "../Pages/TaskManagementDashboard";
import Dashboard from "../Pages/Dashboard";
import Root from "../Pages/Root";
import AddTodo from "../components/AddTodo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path:'/',
        element: <App></App>
      }
      
      
      ,{
       path: "taskManageDashboard",
    element: <TaskManagementDashboard></TaskManagementDashboard>,
  
    },
    {
      path:'createTodo',
      element: <AddTodo></AddTodo>
    }
  ]
  },
  
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Register></Register>,
  },
]);

export default router;
