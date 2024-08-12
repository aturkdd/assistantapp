"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const ChartComp = ({viewTable}) => {


  const years = [...new Set(viewTable.map(item => item.year))];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const dataByYear = {};

  years.forEach(year => {
    dataByYear[year] = new Array(12).fill(0);
  });

  viewTable.forEach(({ month, count, year }) => {
    dataByYear[year][month - 1] += count;
  });

  // Prepare the data for the chart
  const datasets = years.map(year => ({
    label: `Counts for ${year}`,
    data: dataByYear[year],
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
    borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
    borderWidth: 1,
  }));

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Monthly Counts Chart by Year</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComp;
