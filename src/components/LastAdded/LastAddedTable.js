import React , { useEffect, useState } from 'react';
import {Col,Table } from 'react-bootstrap';
import TableRow from './TableRow';
import firebase from '../../firebase';

export const LastAddedTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    var today = new Date();
    var dd = 0
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    let monthNumber = (new Date().getMonth());
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = monthNames[monthNumber];

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
                if(new Date(items[i].created.seconds * 1000).toLocaleDateString("pt-PT").split("/")[1] == new Date().toLocaleDateString("pt-PT").split("/")[1]) {
                    final.push(items[i]);
                }
            }
            setTransactions(final);
            
        })

    }, []);

    return(
        <Col>
            <h2 className='text-center title-dash'>Your {monthName} Transactions</h2>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>   
                    {transactions.map(transaction => (<TableRow key={transaction.id} transaction={transaction} />))}
                </tbody>
            </Table>            
        </Col>
    );
}

export default LastAddedTable;