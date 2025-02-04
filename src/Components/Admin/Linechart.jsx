import React from 'react'
import { Helmet } from 'react-helmet'
import  Chart from 'chart.js/auto'
import { useEffect } from 'react';


const Linechart = () => {
    const labels = ["January", "February", "March", "April", "May", "June"]
    const data={
        labels: labels,
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "hsl(217, 57%, 51%)",
            borderColor: "hsl(217, 57%, 51%)",
            data: [0, 10, 5, 2, 20, 30, 45],
          },
        ],
      }

    
   

     useEffect(()=>{

        if (Chart.instances[0]) {
            Chart.instances[0].destroy();
          }
      const  chartLine = new Chart(
            document.getElementById("chartLine"),
            {
                type:"line",
                data,
                options: {},
              }
          )
     })

  return (
   
    <div  className="w-2/4">
      <div className="overflow-hidden rounded-lg shadow-lg">
  <div
    className="bg-neutral-50 py-3 px-5 dark:bg-neutral-700 dark:text-neutral-200">
    Line chart
  </div>
  <canvas className="p-10" id="chartLine"></canvas>
</div>

<Helmet>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</Helmet>


    </div>
  )
}

export default Linechart
