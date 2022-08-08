import { ChartType } from "chart.js"

const lineChartType: ChartType = "bubble"

const data = {
  datasets: [
    {
      label: "Data Example",
      data: [
        {
          x: 20,
          y: 30,
          r: 15,
        },
        {
          x: 40,
          y: 10,
          r: 10,
        },
      ],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
}

export const bubbleChartData = {
  type: lineChartType,
  data: data,
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
}

export default bubbleChartData
