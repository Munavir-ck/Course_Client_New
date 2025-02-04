import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "../../../axios/axios";




const Linechart = () => {



  const chartRef = useRef(null);
  const [data, setData] = useState([]);





  function MonthName(num) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const monthNumber = num - 1; // Month numbers in JS start from 0, so subtract 1
    const monthName = monthNames[monthNumber];

    console.log(monthName);
    return (
     monthName
    )
  }
  MonthName(6) 
  // Usage example: <MonthName monthNumber={5} />
  


 

  useEffect(() => {
    axios
      .get("/tutor/get_monthlylineChart", {
        headers: {
          Authorization: localStorage.getItem("tutortoken"),
        },
      })
      .then((res) => {
        
        setData(res.data.result);
      });
  }, []);

  useEffect(() => {

    const months=data&&data.map((x) =>  MonthName(x._id.month))


    const chartInstance = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
       
          {
            label: "Total Revenue",
            data:data&&data.map((x) => x.totalProfit),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return (
    <div className="h-96 w-full">
      <canvas ref={chartRef} style={{ height: "200px", width: "200px" }} />
    </div>
  );
};

export default Linechart;
