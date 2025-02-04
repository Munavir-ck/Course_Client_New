import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "../../../axios/axios";
import { get_piechart } from "../../../API/adminReq";

const PieChart = () => {
  const chartRef = useRef(null);
  const [pieChartData, setPiechartData] = useState([]);

  useEffect(() => {
    get_piechart().then((res) => {
      setPiechartData(res.data);
    });
  }, []);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: "pie",
      data: {
        labels: pieChartData.map((item) => item._id),
        datasets: [
          {
            label: "Dataset 1",
            data: pieChartData.map((item) => item.count),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              ,
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
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
  }, [pieChartData]);

  return (
    <div className="h-96 w-96 ">
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
