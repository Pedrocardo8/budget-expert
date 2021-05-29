import React , { useEffect, useState } from 'react';
import {Col,Table,Form,Button,Row } from 'react-bootstrap';
import TableRow from './TableRow';
import firebase from '../../firebase';

export const  AllAdded = () => {
    const [transactions, setTransactions] = useState([]);
    //const [loading, setLoading] = useState(false);
    const [categoria, setCategoria] = useState('');
    const [valor, setValor] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [categorias, setCategorias] = useState([]);


    var today = new Date();
    var dd = 0
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

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
        const ref = firebase.firestore().collection("categories").where("userId", "==", user.uid)
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setCategorias(items);
            
        })

    }, []);

    

    const pesquisarCategoria = (e) => {
        e.preventDefault()
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("transactions").where("userId", "==", user.uid).where('category', '==', categoria)
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setTransactions(items);
            
        })

    }

    const pesquisarValor = (e) => {
        e.preventDefault()
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("transactions").where("userId", "==", user.uid).where('amount', '==', Number(valor))
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setTransactions(items);
            
        })

    }
    const pesquisarDescricao = (e) => {
        e.preventDefault()
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("transactions").where("userId", "==", user.uid).where('description', '==', descricao)
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setTransactions(items);
            
        })

    }
    const limpar = (e) => {
        e.preventDefault()
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("transactions").where("userId", "==", user.uid)
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setTransactions(items);
            
        })
        setValor(0)
        setDescricao('')
        setCategoria('')

    }


    return(
        <Col>
            <h2 className='text-center title-dash'>All Transactions</h2>
            <Row>
                <Col>
                    <Form onSubmit={pesquisarCategoria}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                <option value="0">Choose...</option>
                                {categorias.map(opt => (
                                    <option value={opt.titulo}>{opt.titulo}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit">
                            Search
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <Form onSubmit={pesquisarValor}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" placeholder="Max Value" value={valor} onChange={(e) => setValor(e.target.value)}/>
                        </Form.Group>
                        <Button variant="outline-success" type="submit">
                            Search
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <Form onSubmit={pesquisarDescricao}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                </Col>
            </Row>
            <br></br>

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
            <Button variant="outline-danger" type="submit" onClick={limpar}>
                Clean Filters
            </Button>       
        </Col>
    );
}

export default AllAdded;