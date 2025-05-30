"use client"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { useState } from "react"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function UserPieChart({ data, centerValue }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((d) => d.color),
        borderWidth: 0,
        hoverOffset: 0,
      },
    ],
  }

  const options = {
    cutout: "75%", // for doughnut
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#1f2937", // black-ish
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: (tooltipItem) => {
            const label = data[tooltipItem.dataIndex]?.name || ""
            const value = data[tooltipItem.dataIndex]?.value || 0
            return `${label}: ${value}`
          },
        },
      },
      legend: {
        display: false,
      },
    },
    // onHover: (_, elements) => {
    //   if (elements.length > 0) {
    //     setHoveredIndex(elements[0].index)
    //   } else {
    //     setHoveredIndex(null)
    //   }
    // },
  }

  return (
    <div className="relative w-60 h-60">
      <Doughnut data={chartData} options={options} />

      {/* Center Value */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-semibold text-gray-900">{centerValue}</span>
      </div>
    </div>
  )
}
