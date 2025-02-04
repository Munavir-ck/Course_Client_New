import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import moment from "moment";
import Spinner from "./Spinner/Spinner";
import {getReviwes, getTeachersDetails } from "../../API/userReq";

function TeacherDetail() {
  const [teacher, setTeacher] = useState({});
  const [reviews, setReviews] = useState([]);
  const [totalSatrs, setTotalStars] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [stars, setStars] = useState([
    { id: 1, color: false },
    { id: 2, color: false },
    { id: 3, color: false },
    { id: 4, color: false },
    { id: 5, color: false },
  ]);
  const [stars2, setStars2] = useState([
    { id: 0, color: false },
    { id: 0, color: false },
    { id: 0, color: false },
    { id: 0, color: false },
    { id: 0, color: false },
  ]);
  let total = [];

  useEffect(() => {
    const total = [];
    for (let j = 0; j < reviews.length; j++) {
      const updatedStars = stars2.map((star) => ({ ...star, id: j }));
      total.push(updatedStars);
    }
    setTotalStars(total);
  }, [reviews, stars2]);

  useEffect(() => {}, [reviews]);

  const rating = teacher.rating;

  for (let i = 0; i < rating; i++) {
    stars[i].color = true;
  }

  for (let i = 0; i < reviews.length; i++) {
    for (let j = 0; j < reviews[i].rating; j++) {
      if (totalSatrs.length > i && totalSatrs[i].length > j) {
        totalSatrs[i][j].color = true;
      }
    }
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-6 h-6 ${index < rating ? "text-amber-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const { id } = useParams();

  const getTeacher = async () => {
    const res = await getTeachersDetails(id);
    setTeacher(res.data.result);
  };
  const getReview = () => {
     getReviwes(id).then((res) => {
      setReviews(res.data?.result);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getTeacher();
    getReview();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && <Spinner />}
      <section
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${
          isLoading && "pointer-events-none opacity-20"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <img
                alt="Teacher"
                className="w-full h-64 object-cover rounded-xl shadow-lg border-4 border-white"
                src={teacher.image || "../../../avatar.png"}
              />
              <div className="mt-6 text-center">
                <Link
                  to={`/reservation/${id}`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                >
                  Book Now
                </Link>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <span className="text-gray-600">Fee:</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    {teacher.FEE}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {teacher.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {renderStars(Math.round(teacher.rating))}
                    <span className="ml-2 text-gray-600">
                      ({teacher.rating?.toFixed(1)})
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    {teacher.subject}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Qualification:</strong> {teacher.qualification}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                    <span className="text-gray-700"><strong>Class:</strong> {teacher.class}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                  Student Reviews ({reviews.length})
                </h2>
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <img
                            className="w-12 h-12 rounded-full object-cover"
                            src={review.student?.image || "../../../avatar.png"}
                            alt="Student"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{review.student?.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {moment(review.createdAt).format("MMM D, YYYY")}
                        </span>
                      </div>
                      <p className="mt-4 text-gray-600 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeacherDetail;
