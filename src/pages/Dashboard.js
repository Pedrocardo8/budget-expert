import React, { useState, useEffect }  from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Top from '../components/TopRow/Top';
import LastAddedTable from '../components/LastAdded/LastAddedTable';
import Add from '../components/Add/Add';
import AddCategory from '../components/Add/AddCategory';
import { useAuth } from "../context/AuthContext";
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import Chart from "react-google-charts"
import firebase from '../firebase';

function Dashboard() { 
    
    const [transactions, setTransactions] = useState([]);
    const [budget, setBudget] = useState([]);

    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
    const expense = (amounts.filter(item => item < 0 ).reduce((acc, item) => (acc += item), 0) * -1);

    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("transactions").where("userId", "==", user.uid)
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setTransactions(items);
            
        })
    }, []);

  return ( 
        <div className='dash'>
            <Container>
                <Top />
                <br/>
                <Row md={2} >
                   <Col >
                   {/*<LineChart 
                    width={550}
                    height={350}
                    data={data}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#2ecc71"
                        activeDot={{ r: 8 }}

                    />
                    <Line 
                        type="monotone" 
                        dataKey="expense" 
                        stroke="#c0392b"
                    />
                </LineChart>*/}
                <Chart
                width={'550px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                    'Element',
                    'Total',
                    { role: 'style' },
                    {
                        sourceColumn: 0,
                        role: 'annotation',
                        type: 'string',
                        calc: 'stringify',
                    },
                    ],
                    ['Balance', total, '#007BFF',null],
                    ['Income', income, '#109618', null],
                    ['Expenses', expense, '#DC3912', null],
                    
                ]}
                options={{
                    title: 'Total for May',
                    fontSize: '18',
                    responsive: true,
                    width: 600,
                    height: 400,
                    bar: { groupWidth: '95%' },
                    legend: { position: 'none' },
                }}
                // For tests
                rootProps={{ 'data-testid': '6' }}
                />
                </Col>
                <Col>
                <Chart
                        width={'555px'}
                        height={'400px'}
                        align={'center'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Task', 'Hours per Day'],
                            ['Food', 300],
                            ['House', 110],
                            ['Car', 30],
                            ['Shopping', 150],
                        ]}
                        options={{
                            title: 'Daily Transactions',
                            fontSize: '20',
                            responsive: true,
                            titleTextStyle: { color: '#000' },
                            legendTextStyle: { color: '#000' },
                            maintainAspectRatio: false,
                            //backgroundColor:"#0a2963"
                        }}
                        rootProps={{ 'data-testid': '1' }}
                      />  
                </Col>       
                </Row>
                <Row>
                   <LastAddedTable/>
                    <Col>
                        <Add/>
                        <AddCategory/>
                    </Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default Dashboard;