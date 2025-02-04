import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import SearchClass from "../../Components/Client/Search/SearchClass";
import Spinner from "./Spinner/Spinner";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchError, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await axios.get("/get_classes").then((res) => {
        setLoading(false);
        setClasses(res.data.classes);
      });
    }
    fetchData();
  }, []);

  const handleClick = (url) => {
    setVideoUrl(url);
  };

  const handleCancel = () => {
    setVideoUrl("");
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}

      {/* Title */}
      <motion.div
        className="flex items-center justify-center text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
      >
        <h1 className="text-4xl sm:text-5xl font-semibold text-blue-900">
          Classes For Kids
        </h1>
      </motion.div>

      {/* Search Box */}
      <div className="mt-6">
        <SearchClass setData={setSearchResult} setError={setError} />
      </div>

      {/* Video Player */}
      {videoUrl && (
  <div className="relative w-full max-w-4xl mx-auto mt-8">
    <button
      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 z-50"
      onClick={handleCancel}
    >
      ✕
    </button>
    <ReactPlayer
      url={videoUrl}
      controls
      playing
      loop
      width="100%"
      height="auto"
      className="rounded-lg overflow-hidden shadow-lg"
    />
  </div>
)}


      {/* Classes Grid */}
      <div
        className={`mt-10 ${
          searchError
            ? "flex justify-center"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        }`}
      >
        {searchError ? (
          <p className="text-xl font-semibold text-red-600">
            No results found. Please try a different search.
          </p>
        ) : (
          (searchResult.length > 0 ? searchResult : classes).map((cls, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              {/* Display Thumbnail if available */}
              {cls.thumbnail_path ? (
                <img
                  src={cls.thumbnail_path
                  }
                  alt={`${cls.subject} thumbnail`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              ) : (
                // Optionally, show a placeholder image if no thumbnail is available.
                <img
                  src="/path/to/placeholder.jpg"
                  alt="Placeholder thumbnail"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              
              <h3 className="text-lg font-semibold text-gray-800">
                {cls.subject}
              </h3>
              <p className="text-sm text-gray-600">{cls.description}</p>
              {cls.video_path && (
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  onClick={() => handleClick(cls.video_path)}
                >
                  Watch Video
                </button>
              )}
            </motion.div>
          ))
          
        )}
      </div>
    </div>
  );
}
