import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const UpdateTask = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
const navigate = useNavigate()
  const { data: singleTask = {}, refetch } = useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/singleTask/${id}`);

      return res.data;
    },
  });
  console.log(singleTask);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const updateTodoData = {
  
        taskName: data?.taskName,
        description: data?.description,
        deadline: data?.deadline,
        priority: data?.priority,

    };
    console.log(updateTodoData);
    // console.log('id adsfadffd' , id);

    const addTask = await axiosPublic.patch(
      `/updateTodo/${id}`,
      updateTodoData
    );
    console.log(addTask.data);
    if (addTask.data.modifiedCount) {
        navigate('/taskManageDashboard')
      Swal.fire({
        title: "Success!",
        text: "Task Updated Successfully",
        icon: "success",
        confirmButtonText: "Okay",
      });
    }
 
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="group relative border-2 flex w-auto max-w-xs cursor-pointer flex-col items-start gap-2 overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="absolute left-0 top-0 h-16 w-16">
            <div className="absolute left-[-34px] top-[32px] z-10 w-[170px] -rotate-45 transform bg-gray-600 py-1 text-center font-semibold text-white">
              Update Task{" "}
            </div>
          </div>
          <img
            src="https://i.ibb.co/CM0B0kt/image.png"
            className="transition-all duration-300 group-hover:opacity-90"
          />
          <div className="flex flex-col gap-4 p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="taskName">Task Name:</label>
              <input
                defaultValue={singleTask?.taskName}
                className="border-2 ml-2 border-black rounded-lg"
                {...register("taskName")}
              />
              <br />
              <br />
              <label htmlFor="description">Description:</label>
              <input
                defaultValue={singleTask?.description}
                className="border-2 ml-2  border-black  rounded-lg"
                {...register("description", { required: true })}
              />

              <br />
              <br />

              <label htmlFor="deadline">Deadline:</label>
              <input
                defaultValue={singleTask?.deadline}
                type="date"
                className="border-2 ml-2  border-black  rounded-lg"
                {...register("deadline", { required: true })}
              />

              <br />

              <select
                className="my-5"
                {...register("priority", { required: true })}
                defaultValue={singleTask?.priority}
              >
                <option disabled value="">
                  Select Priority
                </option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
              <br />
              {errors.exampleRequired && (
                <p className="flex justify-center items-center text-center text-xl font-semibold text-red-600 mb-5">
                  {" "}
                  This field is required{" "}
                </p>
              )}
              <div className="w-full flex items-center border-2 mx-auto rounded-lg ">
                <button
                  type="submit"
                  className="relative mx-auto my-4 h-[50px] w-40 overflow-hidden border  border-green-900 bg-white text-green-900 shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-green-900 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-green-900 after:duration-500 hover:text-white hover:shadow-green-900 hover:before:h-2/4 hover:after:h-2/4"
                >
                  <span className="relative z-10 ">Update Task </span>
                </button>
              </div>

              <input />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
