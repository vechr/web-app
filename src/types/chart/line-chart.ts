import { ChartType } from 'chart.js';

const lineChartType: ChartType = "line";
const data = {
  labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July'],
  datasets: [{
    label: 'Data Example',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
export const lineChartData = {
  type: lineChartType,
  data: data,
  options: {
      maintainAspectRatio: false,
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
};

export default lineChartData;