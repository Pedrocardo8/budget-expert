import React, { useState, useEffect } from 'react'
import {Col,Table,Button} from 'react-bootstrap';
import firebase from '../../firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TableLine from '../Investments/TableLine'

function InvestmentsTable() {
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("investments").where("userId", "==", user.uid)
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setInvestments(items);
        })
    }, []);



    return (
        <Col>
            <Table >
                <thead>
                    <tr>
                        <th>Initial Investment</th>                        
                        <th>Time</th>
                        <th>Compound Times Per Year</th>
                        <th>Interest Rate</th>
                        <th>Estimated ROI</th>
                    </tr>
                </thead>
                <tbody>                      
                    {investments.map(investment => (<TableLine key={investment.id} investment={investment} />))}                                        
                    
                </tbody>
            </Table>
        </Col>
    )
}

export default InvestmentsTable;
