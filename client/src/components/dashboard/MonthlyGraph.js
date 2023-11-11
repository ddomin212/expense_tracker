import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { fetchMonthly } from "../../redux/slices/users/accountSlice";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function MonthlyGraph({ type }) {
  const dispatch = useDispatch();
  const { monthlyData } = useSelector((state) => state?.accounts);
  const { currency } = useSelector((state) => state?.currency);

  useEffect(() => {
    dispatch(fetchMonthly(type));
  }, [dispatch]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  let values = [];
  let counts = [];

  const labels = monthlyData?.monthly?.map((item) => {
    const d = new Date();
    d.setMonth(item._id - 1);
    const monthName = d.toLocaleString("en-US", { month: "long" });
    values.push(
      currency?.currency === "CZK"
        ? item.total
        : currency?.currency === "EUR"
        ? item.total / 23.7
        : item.total / 22.1
    );
    counts.push(item.count);
    return monthName;
  });

  const data = {
    labels,
    datasets: [
      {
        label: type === "expense" ? "expenses" : "income",
        data: values,
        backgroundColor:
          type === "expense"
            ? "rgba(255, 99, 132, 0.5)"
            : "rgba(132, 99, 255, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
