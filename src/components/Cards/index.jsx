import { Card, Row } from 'antd';
import React from 'react';
import Button from '../Button';
import "./cards.css";

const Cards = ({income, expense, totalBalance, showExpenseModal, showIncomeModal}) => {
    return (
        <div>
            <Row className="myRow">
                <Card bordered={true} className='myCard'>
                    <h2>Current Balance</h2>
                    <p>₹{totalBalance}</p>
                    <Button text={"Reset Balance"} isBlue={true}/>
                </Card>

                <Card bordered={true} className='myCard'>
                    <h2>Total Balance</h2>
                    <p>₹{income}</p>
                    <Button text={"Add Income"} isBlue={true} onClick={showIncomeModal}/>
                </Card>

                <Card bordered={true} className='myCard'>
                    <h2>Total Expenses</h2>
                    <p>₹{expense}</p>
                    <Button text={"Add Expense"} isBlue={true} onClick={showExpenseModal}/>
                </Card>
            </Row>
        </div>
    );
}

export default Cards;