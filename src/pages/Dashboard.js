import React, { useState, useEffect }  from 'react';
import {Container, Row, Col} from "react-bootstrap";
import Top from '../components/TopRow/Top';
import LastAddedTable from '../components/LastAdded/LastAddedTable';
import Add from '../components/Add/Add';
import AddCategory from '../components/Add/AddCategory';
import Chart from "react-google-charts"
import firebase from '../firebase';

function Dashboard() { 
    
    const [transactions, setTransactions] = useState([]);

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

       /* const get = firebase.firestore().collection("categories").where("userId", "==", user.uid)
        get.onSnapshot((querySnapchot) => {
            const array = [];
            querySnapchot.forEach((doc) => {
                array.push(doc.data())
            });
            setCategories(array);
        })*/

    }, []);

  return ( 
        <div className='dash'>
            <Container>
                <Top />
                <br/>
                <h2 className="title-dash text-center">Analyse With Graphs</h2>
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
                        ['Income',income],
                        ['Expenses', expense],
                        ['Balance', total],
                        
                        
                    
                    ]}
                    options={{
                        title: 'Month Balance',
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