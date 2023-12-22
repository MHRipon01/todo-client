import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/AuthProvider";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableTask from "./DraggableTask";

const AllTasks = ({status}) => {
  const axiosPublic = useAxiosPublic();
  const [todo, setTodo] = useState([]);
  const [ongoing, setOngoing] = useState();
  const [complete, setComplete] = useState();
  const { user } = useContext(AuthContext);
  const { data: AllTasks = [] } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getTask?email=${user?.email}`);
      console.log(user?.email);
      return res.data;
    },
  });

  // console.log(AllTasks);
  useEffect(() => {
    // Update 'todo' state after data is fetched
    const filteredTodo = AllTasks.filter((task) => task?.status === "todo");
    setTodo(filteredTodo);
 
    const filteredOngoing = AllTasks.filter((task) => task?.status === "ongoing");
    setOngoing(filteredOngoing);
 
    const filteredComplete = AllTasks.filter((task) => task?.status === "complete");
    setComplete(filteredComplete);
  }, [AllTasks]); // Run this effect whenever AllTasks changes

  // console.log("todo", todo);
  // console.log("ongoing", ongoing);
  // console.log("cmplt", complete);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      // Handle the drop action here
      // This function will be called when a task is dropped on this component
      // You can access the dropped item details via 'item'
      console.log("Dropped item: ", item , status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  console.log(isOver, "isOver");
  return (
    <div ref={drop} className="md:grid md:grid-cols-3 md:w-full h-screen">
      <div className="border-2">
        <h2 className="text-center text-3xl font-medium my-auto">
          To-do 📝: {todo?.length}
        </h2>

        <div>
          {todo?.map((task) => (
            <div key={task._id}>
              <div
                // style={{backgroundColor:task?.color}}
                className="max-w-screen-lg bg-blue-400 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4"
              >
                <DraggableTask key={task._id} task={task} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div  className="border-2">
        <h2 className="text-center text-3xl font-medium my-auto">
          Ongoing ⏳: {ongoing?.length}
        </h2>
        {ongoing?.map((task) => (
          <div
            key={task._id}
            // style={{backgroundColor:task?.color}}
            className="max-w-screen-lg bg-purple-400 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4"
          >
            <DraggableTask key={task._id} task={task} />
          </div>
        ))}
      </div>
      <div  className="border-2">
        <h2 className="text-center text-3xl font-medium my-auto">
          Completed 🏆🥳🎉 : {complete?.length}
        </h2>
        {complete?.map((task) => (
          <div
            key={task._id}
            className="max-w-screen-lg bg-green-400 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4"
          >
            <DraggableTask key={task._id} task={task} />
          </div>
        ))} 
      </div>
    </div>
  

  );
};

export default AllTasks;
