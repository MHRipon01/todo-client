import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-[url('https://i.ibb.co/Rg9Sb6t/image.png')]  ">
      <div className="md:flex w-full justify-between my-4   ">
        <div>
          <div className="h-1/2">
            <h2 className="text-4xl  font-medium font h-full text-center flex items-center">
              Empower your productivity, one task at a time!
            </h2>
            <div className="w-full my-11 flex justify-center">
              <Link to={'/taskManageDashboard'}>
                <button className="group relative min-h-[50px] rounded-xl font-bold w-40 overflow-hidden border-2  border-purple-500  text-purple-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-purple-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-purple-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
                  <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-purple-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-purple-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                  <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">
                    Explore Now!
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img
            className="md:h-[70vh] rounded-lg"
            src="https://i.ibb.co/vHPnPYv/Banner-Side-Image.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
