import axios from "../../axios/axios";
import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AiFillStar } from "react-icons/ai";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillChatFill } from "react-icons/bs";
import SearchTeacher from "./Search/SearchTeacher";
import { filterTeachers, getSubject, getTeachers } from "../../API/userReq";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Booking() {
  const [checkedValues, setCheckedValues] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(" ");
  const [subject, setSubject] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filterdTeachers, setFilteredTeachers] = useState([]);

  const classes = [1, 2, 3, 4, 5, 6, 7];
  const stars = [1, 2, 3, 4, 5];

 

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedValues([...checkedValues, { value, id }]);
    } else {
      setCheckedValues(checkedValues.filter((item) => item.value !== value));
    }
  };


  const getfilterData = async () => {
   
    const res = await filterTeachers(checkedValues);
  
    if (res.data.status) {
      setFilter(true);
      setTeachers(res.data.result);
    } else {
      setTeachers([]);
      setError(res.data.message);
    }
  };

  useEffect(() => {
    if (checkedValues.length > 0) {
    getfilterData()
    }
  }, [checkedValues]);

  const getdata = async () => {
    const response = await getTeachers();
    if (response.data.status) {
      setTeachers(response.data.data);
    } else {
      setTeachers([]);
      setError(response.data.message);
    }
  };

  useEffect(() => {
    if (checkedValues.length === 0) {
      getdata();
    }
  }, [checkedValues]);

  const getSubjects= async () => {
    const res = await getSubject();
    if (res.data.status) {
      setSubject(res.data.result);
    } else {
      setError(res.data.message);
    }  
  };


  useEffect(() => {
    getSubjects()
    
  }, []);


 
  const filters = [
    {
      id: "subject",
      name: "subject",
      options: subject.map((item) => {
        return {
          value: item.subject,
          label: item.subject,
          id: "subject",
          checked: false,
        };
      }),
    },
    {
      id: "class",
      name: "class",
      options: classes.map((item, index) => {
        return { value: item, label: item, id: "class", checked: false };
      }),
    },
    {
      id: "rating",
      name: "rating",
      options: stars.map((item, index) => {
        return {
          value: item,
          label: item,
          icon: <AiFillStar color="yellow" />,
          id: "star",
          checked: false,
        };
      }),
    },
  ];

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-white">
      <SearchTeacher setData={setTeachers} />
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200 divide-x-2">
                    <h3 className="sr-only">Categories</h3>
                   

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {subject.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.subject}
                                      type="checkbox"
                                      defaultChecked={false}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.subject}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {/* New Arrivals */}
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
               

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                 
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 border-r-2">
              {/* Filters */}
              <form className="hidden lg:block border-r-2">
                <h3 className="sr-only">Categories</h3>
              

                {filters.map((section) => (
                  <>
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={section.id}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={false}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="flex gap-2 ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}{" "}
                                    {option.icon && <> {option.icon} Above </>}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className=" colo  grid gap-6 mt-10  text-center sm:grid-cols-2 m-8  md:grid-cols-3 ">
                  {(filterdTeachers.length !== 0
                    ? filterdTeachers
                    : teachers
                  ).map((items, key) => (
                    <Link to={`/teacher_details/${items._id}`}>
                      <div className="max-w-sm  overflow-hidden shadow-lg m-10 ">
                        <img
                          className="w-full h-5/4"
                          src={
                            items.image ? items.image : "../../../avatar.png"
                          }
                          alt="Sunset in the mountains"
                        />
                        <div className="px-6 py-4">
                          <div className="font-bold text-xl mb-2 text-center">
                            {items.name}
                          </div>
                       
                        <p className="text-gray-700 text-base">
                          {items.subject}
                        </p>
                          <p className="text-gray-700 text-base">
                            {items.qualification}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Booking;
