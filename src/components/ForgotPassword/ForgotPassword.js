import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import '../../App.css';
import budget from '../Sidebar/budget.png'
import calc from '../../components/Login/calc.svg'


export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
// try catch para caso existir erro o user ser alertado
    try {
      setMessage("")
      setError("")
      setLoading(true)
      // permite reset do value email
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }
    setLoading(false)
  }

  return (
    <>
       <Card className=" login text-white" 
      style={{minHeight: "100vh"}}> 
      <Card.Img style={{width: "450px",borderRadius:"15px",left:"3rem"}} src={budget}/>
      <img className="calc" style={{left:"1050px", width:"600px"}} src={calc}></img>
        <Card.Body className="w-100" style={{ maxWidth: "400px"}}>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
          <div className="w-100 text-center mt-2">
                Need an account? <Link to="/register">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}