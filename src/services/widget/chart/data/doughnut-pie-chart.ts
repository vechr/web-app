import { ChartType } from 'chart.js';

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'Data Example',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      hoverOffset: 4,
    },
  ],
};

export const doughnutPieChartData = (type: 'doughnut' | 'pie') => ({
  type: type as ChartType,
  data: data,
  options: {
    maintainAspectRatio: false,
  },
});

export default doughnutPieChartData;
