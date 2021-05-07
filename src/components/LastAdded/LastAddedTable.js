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

    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("transactions").where("userId", "==", user.uid)//.where('created', '>=', new Date(2021, 1, 1)).where('created', '<=', new Date(2021, 5, 30))
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setTransactions(items);
            
        })

    }, []);


    return(
        <Col>
            <h2>Last Added</h2>
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