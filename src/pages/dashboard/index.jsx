import React, { useState } from "react";
import Header from "../../components/Header";
import Cards from "../../components/Cards";
import { Modal } from "antd";
import AddExpenseModal from "../../components/Modals/AddExpense";
import AddIncomeModal from "../../components/Modals/AddIncome";

const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  function showExpenseModal() {
    setIsExpenseModalVisible(true);
  }
  function showIncomeModal() {
    setIsIncomeModalVisible(true);
  }
  function handleExpenseCancel() {
    setIsExpenseModalVisible(false);
  }
  function handleIncomeCancel() {
    setIsIncomeModalVisible(false);
  }
  function onFinish(value, type){
    console.log("OnFinish", value, type);
  }

  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
    </div>
  );
};

export default Dashboard;
