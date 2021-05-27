import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import '../../App.css';
import budget from '../Sidebar/budget.png'
import calc from '../../components/Login/calc.svg'
import { auth,provider } from "../../firebase";
import logo from '../../components/Login/logo.png'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }
  const handleAuth =() => {
      auth.signInWithPopup(provider).then((result) => {
      console.log(result)
      history.push("/")
    }).catch((error) =>{
      alert(error.message);
    });
    setLoading(false)
  };
  
  return (
    <>
      <Card className=" login text-white" 
      style={{minHeight: "100vh"}}> 
      <Card.Img style={{width: "450px",borderRadius:"15px",left:"3rem"}} src={budget}/>
      <img className="calc" style={{left:"1050px", width:"600px"}} src={calc}></img>
        <Card.Body className="w-100" style={{ maxWidth: "400px"}}>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
            <p></p>
            <Button onClick={handleAuth} className="w-100" type="submit">
              Sign In with Google <img style={{width:"45px"}} src={logo}></img>
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/register">Register</Link>
          </div>          
        </Card.Body>
      </Card>
      
    </>
  )
}