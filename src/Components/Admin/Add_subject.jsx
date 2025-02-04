import React from "react";
import axios from "../../axios/axios";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import {ToastContainer,toast} from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { add_subject } from "../../API/adminReq";

const filters = [
  {
    id: "Class",
    name: "Class",
    options: [
      { value: "1", label: "1", checked: false },
      { value: "2", label: "2", checked: false },
      { value: "3", label: "3", checked: false },
      { value: "4", label: "4", checked: false },
      { value: "5", label: "5", checked: false },
      { value: "6", label: "6", checked: false },
      { value: "7", label: "7", checked: false },
    ],
  },
];
function Add_subject() {

    const navigate=useNavigate()
  const [checkedValues, setCheckedValues] = useState([]);
  const [subject, setSubject] = useState("");

  const handleChange = (e) => {
    setSubject(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;

    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((val) => val !== value));
    }
  };

  console.log(checkedValues, 22);

  const handleSubmit = (e) => {
    e.preventDefault();
    add_subject(checkedValues,subject) 
    .then((res)=>{
    toast.success("success") 
    navigate("/admin/add_subject")
    }).catch((err)=>{
        toast.error("error")
        console.log(err);
    })
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 h-screen overflow-y-auto">
      <div className="mx-auto max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">ADD NEW SUBJECT</p>
          <ToastContainer/>
          <div>
            <label for="subject" className="sr-only">
              SUBJECT
            </label>
 
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter subject"
                name="subject"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4 border-t border-gray-200 divide-x-2">
            <h3 className="sr-only">Categories</h3>
            {/* <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((Class) => (
                        <li key={Class.name}>
                          <a href={Class.href} className="block px-2 py-3">
                            {Class.name}
                          </a>
                        </li>
                      ))}
                    </ul> */}

            {filters.map((section) => (
              <Disclosure
                as="div"
                key={section.id}
                className="border-t border-gray-200 px-4 py-6"
              >
                {({ open }) => (
                  <>
                  {checkedValues?open===false:open===true}
                    <h3 className="-mx-2 -my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              defaultChecked={option.checked}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={handleCheckboxChange}
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add_subject;
