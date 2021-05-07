import React, { useState, useEffect } from 'react'
import {Col,Table,Button} from 'react-bootstrap';
import firebase from '../../firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

function TableLine({investment}) {

    const onDelete = () => {        
        const db = firebase.firestore()        
        db.collection("investments").where("roi", "==", investment.roi).get()
        .then(querySnapshot => {
            querySnapshot.docs[0].ref.delete();
        });
    }

    return (
                                                   
            <tr>
                <td>{investment.initial}</td>
                <td>{investment.time}</td>
                <td>{investment.compound}</td>
                <td>{investment.interest}%</td>
                <td>{investment.roi}€</td>
                <td>
                <IconButton aria-label="delete"  color="primary">
                    <DeleteIcon onClick={onDelete}/>
                </IconButton>
            
                </td>
               
                
                
            </tr>
               
        

        
    )
}

export default TableLine
