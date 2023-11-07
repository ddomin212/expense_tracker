import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const DataGraph = ({ income, expenses }) => {
  ChartJS.register(ArcElement, Legend);
  const data = {
    labels: ["Expenses", "Income"],
    plugins: {
      legend: {
        position: "bottom",
        alignItems: "left",
      },
    },
    datasets: [
      {
        label: "# expenses",
        data: [expenses, income],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        display: "flex",
        maxHeight: "300px",
        maxWidth: "300px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <Pie data={data} />
    </div>
  );
};

export default DataGraph;
