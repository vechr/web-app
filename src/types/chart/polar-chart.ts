import { ChartType } from 'chart.js';

const lineChartType: ChartType = "polarArea";
const data = {
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue'
  ],
  datasets: [{
    label: 'Data Example',
    data: [11, 16, 7, 3, 14],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(201, 203, 207)',
      'rgb(54, 162, 235)'
    ]
  }]
};


export const polarAreaChartData = {
  type: lineChartType,
  data: data,
  options: {
    maintainAspectRatio: false
  }
};

export default polarAreaChartData;