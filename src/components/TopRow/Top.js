import React,{ useState, useEffect} from 'react';
import { Container,Row,Col} from 'react-bootstrap';
import TopCard from './TopCard';
import firebase from '../../firebase';
import ExpensesBudget from '../Budget/ExpensesBudget';

export const Top = () => {
  
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

    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("budgets").where("userId", "==", user.uid).where("category", "==", "Expenses")         
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setBudget(items);
            
            
        })

    }, []);


    return(
        <div>
            <Container>
                <Row className='mt-5'>
                    <TopCard titulo="Total Balance" balanco={total} />
                    <TopCard titulo="Monthly Income" balanco={income}/>
                    <TopCard titulo="Monthly Expenses" balanco={expense}/>
                    <Col className='border rounded bg-primary'>                         
                        {budget.map(budget => (<ExpensesBudget key={budget.id} budget={budget} />))}      
                    </Col>

            
                </Row>
            </Container>
           
         </div>
    );
}

export default Top;