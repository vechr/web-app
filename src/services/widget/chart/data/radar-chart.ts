import { ChartType } from 'chart.js';

const lineChartType: ChartType = 'radar';
const data = {
  labels: [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running',
  ],
  datasets: [
    {
      label: 'Data Example 1',
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)',
    },
  ],
};

export const radarChartData = {
  type: lineChartType,
  data: data,
  options: {
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  },
};

export default radarChartData;
