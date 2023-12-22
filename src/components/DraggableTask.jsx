import { useDrag, useDrop } from "react-dnd";

const DraggableTask = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task?._id, type: "task" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  //   const [{ isOver }, drop] = useDrop(() => ({
  //     accept: "task",
  //     drop: (item, monitor) => {
  //       // Handle the drop action here
  //       // This function will be called when a task is dropped on this component
  //       // You can access the dropped item details via 'item'
  //       console.log("Dropped item: ", item);
  //     },
  //     collect: (monitor) => ({
  //       isOver: !!monitor.isOver(),
  //     }),
  //   }));

  console.log(isDragging, "is dragging");
  //   console.log(isOver,'is dropping');
  return (
    // <div ref={drop} className={`droppable-area ${isOver ? "highlight" : ""}`}>
    <div ref={drag} className={`${isDragging ? "dragging" : ""}`}>
      <h2 className="text-3xl leading-9 font-bold tracking-tight sm:text-4xl sm:leading-10">
        {task?.taskName}
      </h2>
      <p>{task?.description.slice(0, 90) + "...."}</p>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-md gap-4  shadow">
          <button className="text-gray-700 font-bold bg-white py-2 px-6">Update</button>

          <button className="text-gray-700 font-bold bg-white py-2 px-6">Delete</button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default DraggableTask;
