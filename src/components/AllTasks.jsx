import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/AuthProvider";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableTask from "./DraggableTask";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllTasks = ({ status }) => {
  const axiosPublic = useAxiosPublic();
  const [todo, setTodo] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [ongoing, setOngoing] = useState();
  const [complete, setComplete] = useState();
  const { user } = useContext(AuthContext);


  const { data: AllTasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getTask?email=${user?.email}`);
      console.log(user?.email);
      setTasks(res.data);
     
      return res.data;
     
    },
  });
  // useEffect(
    
  // refetch()
  //   ,[])
  // console.log(AllTasks);
  useEffect(() => {
    // Update 'todo' state after data is fetched
    if (Array.isArray(tasks)) {
    const filteredTodo = tasks?.filter((task) => task?.status === "todo");
    setTodo(filteredTodo);

    const filteredOngoing = tasks?.filter((task) => task?.status === "ongoing");
    setOngoing(filteredOngoing);

    const filteredComplete = tasks?.filter(
      (task) => task?.status === "complete"
    );
    setComplete(filteredComplete); 
    
}}, [tasks]); // Run this effect whenever AllTasks changes

  // console.log("todo", todo);
  // console.log("ongoing", ongoing);
  // console.log("cmplt", complete);

  const statuses = ["todo", "ongoing", "complete"];

  // const [{ isOver }, drop] = useDrop(() => ({
  //   accept: "task",
  //   drop: (item) => {
  //     // Handle the drop action here
  //     // This function will be called when a task is dropped on this component
  //     // You can access the dropped item details via 'item'
  //     console.log("Dropped item: ", item , status);
  //   },
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // }));
  // console.log(isOver, "isOver");
  return (
    <div className="md:grid md:grid-cols-3 md:w-full h-screen text-center text-3xl font-medium my-auto ">
      {" "}
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          todo={todo}
          ongoing={ongoing}
          complete={complete}
          tasks={tasks}
          setTasks={setTasks}
        ></Section>
      ))}{" "}
    </div>
    // <div ref={drop} className="md:grid md:grid-cols-3 md:w-full h-screen">
    //   <div className="border-2">
    //     <h2 className="text-center text-3xl font-medium my-auto">
    //       To-do 📝: {todo?.length}
    //     </h2>

    //     <div>
    //       {todo?.map((task) => (
    //         <div key={task._id}>
    //           <div
    //             // style={{backgroundColor:task?.color}}
    //             className="max-w-screen-lg bg-blue-400 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4"
    //           >
    //             <DraggableTask key={task._id} task={task} />
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <div  className="border-2">
    //     <h2 className="text-center text-3xl font-medium my-auto">
    //       Ongoing ⏳: {ongoing?.length}
    //     </h2>
    //     {ongoing?.map((task) => (
    //       <div
    //         key={task._id}
    //         // style={{backgroundColor:task?.color}}
    //         className="max-w-screen-lg bg-purple-400 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4"
    //       >
    //         <DraggableTask key={task._id} task={task} />
    //       </div>
    //     ))}
    //   </div>
    //   <div  className="border-2">
    //     <h2 className="text-center text-3xl font-medium my-auto">
    //       Completed 🏆🥳🎉 : {complete?.length}
    //     </h2>
    //     {complete?.map((task) => (
    //       <div
    //         key={task._id}
    //         className="max-w-screen-lg bg-green-400 shadow-2xl rounded-lg mx-auto text-center py-12 mt-4"
    //       >
    //         <DraggableTask key={task._id} task={task} />
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default AllTasks;

const Section = ({ status, todo, ongoing, complete, tasks, setTasks }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item?.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    
    }), 
  }));
 
  let text = "Todo";
  let bg = "bg-blue-400";
  let tasksToMap = todo;

  if (status === "todo") {
    text = "To-Do📝";
    bg = " bg-blue-400 ";
    tasksToMap = todo;
  }

  if (status === "ongoing") {
    text = "Ongoing ⏳";
    bg = "bg-purple-400";
    tasksToMap = ongoing;
  }

  if (status === "complete") {
    text = "Completed 🏆🥳🎉 ";
    bg = " bg-green-400";
    tasksToMap = complete;
  }
  const axiosPublic = useAxiosPublic();
  const addItemToSection = async (id) => {
    console.log("dropped card", id, status);
    const updateStatus = {
      status,
    };
  
    try {
      // Optimistically update the UI
      const updatedTasks = tasks?.map((task) => {
        if (task._id === id) {
          return { ...task, status }; // Update the status of the dropped task in UI
        }
        return task;
      });
  
      setTasks(updatedTasks); // Update the UI optimistically
  
      // Make the API call to update the status
      const response = await axiosPublic.patch(`/updateStatus/${id}`, updateStatus);
 
      // After receiving the updated data from the server, update the state with the new data
      if (response.data) {
        const card = await axiosPublic.get(`/getTask`)
        console.log(card?.data , 'card ');
        console.log(response.data);
        setTasks(card.data ); // Update the UI with the response from the server
      }
    } catch (error) {
      console.error("Error updating status:", error);
      // Revert the changes if there's an error (optional)
      // You can implement rollback logic here to revert the optimistic update
    }
  };
  

  return (
    <div ref={drop} className={`border-2  ${isOver ? "bg-slate-200" : ""}`}>
      <Header text={text} bg={bg} count={tasksToMap?.length}></Header>
      {tasksToMap?.length > 0 &&
        tasksToMap.map((task) => (
          <Task
            key={task._id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          ></Task>
        ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`border-2 ${bg} py-8 text-sm flex items-center rounded-md uppercase h-12 pl-4 text-white `}
    >
      <p className="text-xl "> {text} </p>
      <div className="ml-2 bg-white w-5 h-5  text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task?._id, type: "task" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // console.log(isDragging);

  const axiosPublic = useAxiosPublic()
  //delete data 
  const handleDelete = async (_id) => {
    console.log(_id);
    // axiosPublic.delete(`/deleteTask/${_id}`)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => { // Added 'async' here
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/deleteTask/${_id}`);
          if (res.data.deletedCount > 0) {
            const card = await axiosPublic.get(`/getTask`);
            console.log(card?.data, 'card ');
            // console.log(response.data);
            setTasks(card.data);
            Swal.fire({
              title: "Deleted!",
              text: "Task has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Error deleting task:", error);
          // Handle error if needed
        }
      }
    });
  };
  




  return (
    <div
      ref={drag}
      className={`${task?.status === "todo" && "bg-blue-300"}
       ${task?.status === "ongoing" && "bg-purple-300"} 
 ${task?.status === "complete" && "bg-green-300"} my-5 mx-2 rounded-lg py-4 ${
        isDragging ? "opacity-20" : "opacity-100"
      } `}
    >
      <div>
        <h2
          className={`text-3xl leading-9 font-bold tracking-tight sm:text-4xl sm:leading-10 `}
        >
          {task?.taskName}
        </h2>
        <p>{task?.description.slice(0, 90) + "...."}</p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md gap-4  shadow">

            <Link to={`/updateTask/${task._id}`}>
              <button className="text-gray-700 rounded-lg font-bold bg-white py-1 px-6">
              Update
            </button>
            </Link>
          

            <button onClick={()=>handleDelete(task._id)} className="text-gray-700 rounded-lg font-bold bg-white py-1 px-6">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
