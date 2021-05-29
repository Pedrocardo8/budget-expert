import React , { useEffect, useState } from 'react';
import GoalLine from './GoalLine';
import firebase from '../../firebase';
import { Container} from 'react-bootstrap';

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
            <h2 className="title-dash text-center">Current Goals</h2>
            <Container>
                <div className="">
                    <div className="goals-list">
                        {goals.map(goal => (
                            <div className="goal">
                             <GoalLine  key={goal.id} goal={goal} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>    
        </div>
    )
}


export default GoalList;
