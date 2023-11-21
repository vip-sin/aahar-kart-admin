import React, { useEffect } from "react";
import { Line } from "react-chartjs-2"; // Import Chart.js or any other chart library

const Graph = ({ data }) => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"], // Sample labels
    datasets: [
      {
        label: "Sales",
        data: data,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: { type: "linear", beginAtZero: true },
    },
  };
  useEffect(() => {
    // Perform cleanup when the component unmounts
    return () => {
      // Access the chart instance and destroy it
      const chartInstance = document.querySelector("#myChart"); // Replace with your chart's ID or specific selector
      if (chartInstance) {
        chartInstance.chartInstance.destroy();
      }
    };
  }, []);
  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Graph;
