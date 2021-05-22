import React , { useEffect, useState } from 'react';
import GoalLine from './GoalLine';
import firebase from '../../firebase';
import { Container, Row } from 'react-bootstrap';

export const GoalList = () => {
    const[goals, setGoals] = useState([]);

    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("goals").where("userId", "==", user.uid)        
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setGoals(items);
            
        })

    }, []);



    return(
        <div>
            <h2>Current Goals</h2>
            <Container>
                <div className="row">
                    <div className="col-12 col-md-6">
                        {goals.map(goal => (
                            <GoalLine  key={goal.id} goal={goal} />
                        ))}
                    </div>
                </div>
            </Container>    
        </div>
    )
}


export default GoalList;
