import React, { useState } from "react";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "./ProgressBAr/ProgressBar";

function UploadClass() {
  const [selectedVideos, setSelectedVideos] = useState(null);
  const [loaded, Setloading] = useState(0);
  const [subject, setSubject] = useState("");
  const [Class, setClass] = useState("");
  const [description, setDescription] = useState("");

  const handleClass = (e) => {
    setClass(e.target.value);
  };

  const handleChange = (e) => {
    setSubject(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const maxSelectFile = (event) => {
    const files = event.target.files;
    if (files.length > 1) {
      toast.error("Maximum one file is allowed");
      event.target.value = null;
      return false;
    } else {
      let err = "";
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 52428800) {
          err += files[i].name + " ";
        }
      }
      if (err !== "") {
        event.target.value = null;
        toast.error(err + "is too large");
        return false;
      }
    }
    return true;
  };

  const validation = () => {
    if (!selectedVideos) {
      return false;
    }
    return true;
  };

  const fileChangehandler = (e) => {
    if (maxSelectFile(e)) {
      const files = e.target.files;
      setSelectedVideos(files);
      Setloading(0);
    }
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!validation()) {
      toast.error("No files selected");
      return;
    }
    const data = new FormData();
    for (let i = 0; i < selectedVideos.length; i++) {
      data.append("file", selectedVideos[i]);
    }
    data.append("subject", subject);
    data.append("class", Class);
    data.append("description", description);
    axios
      .post("admin/upload_class", data, {
        headers: {
          Authorization: localStorage.getItem("admintoken"),
        },
        onUploadProgress: (ProgressEvent) => {
          Setloading((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Error uploading file");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-2">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-4">
        <ToastContainer />
        <h1 className="text-xl font-bold text-gray-900 mb-3">Add Your Classes</h1>
        <form onSubmit={handleFileUpload} encType="multipart/form-data" className="space-y-3">
          <div>
            <label htmlFor="class" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              CLASS
            </label>
            <input
              type="text"
              name="class"
              id="class"
              placeholder="Class"
              onChange={handleClass}
              value={Class}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              onChange={handleDescription}
              value={description}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Subject"
              onChange={handleChange}
              value={subject}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-3 pb-2">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mb-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">MP4 (MAX. 50 MB)</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="video/*"
                onChange={fileChangehandler}
              />
            </label>
          </div>
          <ProgressBar value={loaded} />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadClass;
