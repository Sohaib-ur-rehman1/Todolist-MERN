import "./styles.css";
import React, { useState, useEffect } from "react";
import Create from "./Create";
import { baseURL } from "./BaseURL";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function App() {
  const [todos, settodos] = useState([]);
  function fetchData() {
    axios
      .get(baseURL + "tasks")
      .then((result) => settodos(result?.data))
      .catch((err) => toast.error(err.message));
  }
  function handleComplete(id) {
    axios
      .put(baseURL +"update/" + id)
      .then((result) => toast.success(result?.data?.message))
      .catch((err) => toast.error(err.message));
      setTimeout(fetchData(), 1000);
  }
  function handleDelete(id) {
    axios
      .delete(baseURL +"delete/" + id)
      .then((result) => toast.success(result?.data?.message))
      .catch((err) => toast.error(err.message));
      setTimeout(fetchData(), 1000);
  }
  console.log(todos);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <Toaster />
      <div className="text-2xl font-bold">All Tasks</div>
      <Create fetch={fetchData} />
      <div className="flex flex-wrap justify-start gap-3">
        {todos?.length === 0 ? (
          <div>No Record Found</div>
        ) : (
          todos.map((item, index) => (
            <div key={item._id} className="flex flex-col text-regular bg-black text-white p-6">
             <div> #{index}: {item.task} </div>
   
             <div><span className="font-bold underline">Status: </span>{item.status === true ? "Completed" : "Pending"}  </div>
             <div className="flex flex-wrap justify-start gap-3"> 
      {!item?.status === true &&
      <button
        type="button"
        className="border border-white p-3 rounded-xl bg-black text-white"
        onClick={() => {
          handleComplete(item?._id);
        }}
      >
        ✓
      </button> 
}
      <button
        type="button"
        className="border border-white p-3 rounded-xl bg-black text-white"
        onClick={() => {
          handleDelete(item?._id);
        }}
      >
        ✘
      </button> 
      </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
