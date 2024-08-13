import { ChartType } from 'chart.js';

const lineChartType: ChartType = 'scatter';
const data = {
  datasets: [
    {
      label: 'Scatter Dataset',
      data: [
        {
          x: -10,
          y: 0,
        },
        {
          x: 0,
          y: 10,
        },
        {
          x: 10,
          y: 5,
        },
        {
          x: 0.5,
          y: 5.5,
        },
      ],
      backgroundColor: 'rgb(255, 99, 132)',
    },
  ],
};

export const scatterChartData = {
  type: lineChartType,
  data: data,
  options: {
    maintainAspectRatio: false,
    scale: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
    },
  },
};

export default scatterChartData;
