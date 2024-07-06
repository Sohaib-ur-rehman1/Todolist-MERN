import "./styles.css";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "./BaseURL";

export default function Create({ fetch }) {
  const [task, settask] = useState([]);
  const handleSubmit = () => {
    axios
      .post(baseURL + "add", { task })
      .then((result) => toast.success(result?.data?.message))
      .catch((err) => toast.error(err.message));
    setTimeout(fetch(), 2000);
  };
  return (
    <div className="flex gap-3 justify-center">
      <Toaster />
      <input
        type="text"
        name="task"
        className="border border-black p-3"
        onChange={(e) => settask(e.target.value)}
      />
      <button
        type="button"
        className="border border-black p-3 rounded-xl bg-black text-white"
        onClick={() => {
          handleSubmit();
        }}
      >
        Add
      </button>
    </div>
  );
}
