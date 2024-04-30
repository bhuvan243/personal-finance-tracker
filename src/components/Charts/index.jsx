import { Line, Pie } from "@ant-design/charts";
import React from "react";
import "./charts.css";

const ChartComponent = ({ sortedTransactions }) => {
  //   const data = [
  //     { year: "1991", value: 3 },
  //     { year: "1992", value: 4 },
  //     { year: "1993", value: 3.5 },
  //     { year: "1994", value: 5 },
  //     { year: "1995", value: 4.9 },
  //     { year: "1996", value: 6 },
  //     { year: "1997", value: 7 },
  //     { year: "1998", value: 9 },
  //     { year: "1999", value: 13 },
  //   ];

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
