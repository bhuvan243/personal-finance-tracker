import { Line, Pie } from "@ant-design/charts";
import React from "react";
import "./charts.css";

const ChartComponent = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((transaction) => ({
    date: transaction.date,
    amount: transaction.amount,
  }));

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type === "expense") {
      return {
        tag: transaction.tag,
        amount: transaction.amount,
      };
    }
  });

  const finalSpending = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  const config = {
    data: data,
    width: 800,
    xField: "date",
    yField: "amount",
  };

  const spendingConfig = {
    data: Object.values(finalSpending),
    angleField: "amount",
    colorField: "tag",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "0 2rem",
      }}
    >
      <div className="lineChart">
        <h1>Your Analytics</h1>
        <Line {...config} />
      </div>
      <div className="pieChart">
        <h1>Your Spendings</h1>
        <Pie {...spendingConfig} />
      </div>
    </div>
  );
};

export default ChartComponent;
