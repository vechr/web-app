import { ChartType } from "chart.js"

const lineChartType: ChartType = "doughnut"
export const gaugeChartData = {
  type: lineChartType,
  plugins: [
    {
      afterDraw: (chart: {
        config: {
          data: {
            datasets: {
              needleValue: any
              data: any[]
            }[]
          }
        }
        ctx: any
        canvas: {
          offsetWidth: any
          offsetHeight: any
        }
      }) => {
        const needleValue = chart.config.data.datasets[0].needleValue
        const dataTotal = chart.config.data.datasets[0].data.reduce(
          (a, b) => a + b,
          0
        )
        const angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI
        const ctx = chart.ctx
        const cw = chart.canvas.offsetWidth
        const ch = chart.canvas.offsetHeight
        const cx = cw / 2
        const cy = ch - 6

        ctx.translate(cx, cy)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.moveTo(0, -3)
        ctx.lineTo(ch - 20, 0)
        ctx.lineTo(0, 3)
        ctx.fillStyle = "rgb(0, 0, 0)"
        ctx.fill()
        ctx.rotate(-angle)
        ctx.translate(-cx, -cy)
        ctx.beginPath()
        ctx.arc(cx, cy, 5, 0, Math.PI * 2)
        ctx.fill()
      },
    },
  ],
  data: {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: [30, 30, 40],
        needleValue: 80,
        backgroundColor: [
          "rgba(63, 191, 63, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
      },
    ],
  },
  options: {
    responsive: true,
    aspectRatio: 2,
    layout: {
      padding: {
        bottom: 3,
      },
    },
    rotation: -90,
    cutout: "50%",
    circumference: 180,
    legend: {
      display: false,
    },
    animation: {
      animateRotate: false,
      animateScale: true,
    },
  },
}

export default gaugeChartData
