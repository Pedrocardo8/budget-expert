import React, { useState, useEffect }  from 'react';
import {Container, Row, Col} from "react-bootstrap";
import Top from '../components/TopRow/Top';
import LastAddedTable from '../components/LastAdded/LastAddedTable';
import Add from '../components/Add/Add';
import AddCategory from '../components/Add/AddCategory';
import Chart from "react-google-charts"
import firebase from '../firebase';

function Dashboard() { 
    
    const [transactionsEver, setTransactionsEver] = useState([]);
    const [transactionsMonth, setTransactionsMonth] = useState([]);

    const amounts = transactionsMonth.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
    const expense = (amounts.filter(item => item < 0 ).reduce((acc, item) => (acc += item), 0) * -1);

    const amountsEver = transactionsEver.map(transaction => transaction.amount);
    const totalEver = amountsEver.reduce((acc, item) => (acc += item), 0);
    const incomeEver = amountsEver.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
    const expenseEver = (amountsEver.filter(item => item < 0 ).reduce((acc, item) => (acc += item), 0) * -1);


    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("transactions").where("userId", "==", user.uid)//.where('created', '>', new Date(2021, 1, 1))
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            const final = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            for(var i = 0; i < items.length; i++){
                if(new Date(items[i].created.seconds * 1000).toLocaleDateString("pt-PT").split("/")[1] === new Date().toLocaleDateString("pt-PT").split("/")[1]) {
                    final.push(items[i]);
                }
            }
            setTransactionsMonth(final);
        })
    }, []);

    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("transactions").where("userId", "==", user.uid)//.where('created', '>', new Date(2021, 1, 1))
        ref.onSnapshot((querySnapchot) => {
            const final = [];
            querySnapchot.forEach((doc) => {
                final.push(doc.data())
            });
            setTransactionsEver(final);
        })
    }, []);

  return ( 
        <div className='dash'>
            <Container>
                <Top />
                <br/>
                <h2 className="title-dash text-center">Chart Analysis</h2>
                <Row md={2} >
                <Col >
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
                    title: 'Total for the Month',
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
                        ['Income',incomeEver],
                        ['Expenses', expenseEver],
                        ['Balance', totalEver],
                        
                        
                    
                    ]}
                    options={{
                        title: 'Balance Since day one',
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
                <Row className="under-graphs">
                   <LastAddedTable/>
                    <Col>
                        <Add/>
                    </Col>
                </Row>
                <AddCategory className="under-graph"/>
            </Container>
        </div>
    )
}

export default Dashboard;