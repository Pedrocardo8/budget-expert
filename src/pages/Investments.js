import React, {useState} from 'react';
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import InvestmentsTable from '../components/Investments/InvestmentsTable'
import { useAuth } from '../context/AuthContext'
import firebase from '../firebase';
import Currency from '../components/Currency/Currency'
import '../App.css';


function Investments() {
    const [roi, setRoi] = useState(0);
    const [initialInvestment, setInitialInvestment] = useState(0);
    //const [monthlyContribution, setMonthlyContribution] = useState(0);
    const [time, setTime] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [compound, setCompound] = useState(0);
    const { currentUser, logout } = useAuth()

    
    const calculateRoi = (e) => {      
        e.preventDefault()
        const result = initialInvestment * (Math.pow((1 + ((interestRate/100) / compound)), (compound * time )));
        setRoi(result.toFixed(2));
        const db = firebase.firestore()
        db.collection("investments").add({
            compound: +compound,
            initial: +initialInvestment,
            interest: +interestRate,
            time: time,
            roi: result.toFixed(2),
            userId: currentUser.uid
        })
        setInitialInvestment(0)
        setTime(0)
        setInterestRate(0)
        setCompound(0)
        
    }




    return (
        <div className='dash mt-5'>
            <Container>
                <Row>
                    <Col>
                        <Currency />
                    </Col>
                    <Col>
                        <Form onSubmit={calculateRoi}>
                        <h2 className='text-center title-dash'>Calculate ROI</h2>                   
                        <Form.Group>
                        <Form.Label>Initial Investment</Form.Label>
                        <Form.Control type="text" placeholder="Amount" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)}/>
                        </Form.Group>

                    {/*<Form.Group>
                        <Form.Label>Monthly Contribution</Form.Label>
                        <Form.Control type="text" placeholder="Amount" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)}/>
                        </Form.Group> */ } 

                        <Form.Group>
                        <Form.Label>Time in Years</Form.Label>
                        <Form.Control type="text" placeholder="Lenght" value={time} onChange={(e) => setTime(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                        <Form.Label>Interest Rate</Form.Label>
                        <Form.Control type="text" placeholder="Amount" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}/>
                        </Form.Group>

                        <Form.Group >
                        <Form.Label>Compound interval</Form.Label>
                        <Form.Control as="select" value={compound} onChange={(e) => setCompound(e.target.value)}>
                        <option>-</option>
                        <option>1</option>
                        <option>4</option>
                        <option>12</option>
                
                        </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" block>Calculate</Button>    
                                                            
                        </Form>
                    </Col>

                </Row>

                <h2 className="text-center p-2 text-success">ROI Value is {roi}€</h2>
                <InvestmentsTable />
                
            </Container>

        </div>
    );
}
export default Investments;