import React from "react";

import Sidebar from "../../Components/Admin/Sidebar";
import Transactions from "../../Components/Admin/Transactions";

function Transaction_page() {
  return (
    <div className="overflow-hidden">
      <div className="flex ">
        <Sidebar />
        <div className=" w-full ">
          <Transactions />
        </div>
      </div>
    </div>
  );
}

export default Transaction_page;
