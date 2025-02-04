import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import ShareProfit from "./ModalShareProfit/ShareProfit";
import { get_transction } from "../../API/adminReq";
function Transactions() {
  const [modal, setModal] = useState(false);
  const [teacher, setTeacher] = useState({});
  const [transaction, setTransaction] = useState([]);
  const [transaction_id, setTransaction_id] = useState(null);
 

  const handleOnClick = (teachersD, transactionId) => {

    setModal(!modal);
    setTeacher(teachersD);
    setTransaction_id(transactionId);
  };


  useEffect(() => {
    get_transction()
      .then((res) => {
        const list = res.data.result;
        console.log(list);

        setTransaction(list);
      });
  }, []);
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 h-screen overflow-y-auto">
        <div className="mx-auto max-w-lg"></div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                FROM
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {transaction.map((item) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.from.image}
                    alt="Jese image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {item.from.name}
                    </div>
                    <div className="font-normal text-gray-500">
                      {item.createdAt}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {" "}
                  {moment(item.createdAt).format("MMMM Do YYYY")}
                </td>
                <td className="px-6 py-4"> {item.teacher.FEE}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                    {item.type}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {item.shareProfit?
                  <button className="bg-green-800">Sucess</button>:

                <a
                    onClick={() => handleOnClick(item.teacher, item._id)}
                    type="button"
                    data-modal-target="editUserModal"
                    data-modal-show="editUserModal"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Share Profit
                  </a>
                }
                </td>
                <ShareProfit
                  modal={modal}
                  setModal={setModal}
                  teacher={teacher}
                  transaction_id={transaction_id}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
