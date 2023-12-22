import { Outlet } from "react-router-dom";
import App from "../App";
import Navbar from "../components/Navbar";


const Root = () => {
    return (
        <div className='max-w-[1280px] mx-auto'>
            <Navbar></Navbar>
           
            <Outlet></Outlet>
        </div>
    );
};

export default Root;