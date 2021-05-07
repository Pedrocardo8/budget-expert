import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import '../../App.css';
import budget from '../Sidebar/budget.png'
import calc from '../../components/Login/calc.svg'


export default function Register() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
      console.log(Error)
    }

    setLoading(false)
  }

  return (
    <>
      <Card className="login d-flex align-items-center justify-content-center text-white" style={{minHeight:"100vh"}}>
        <Card.Img style={{width: "450px",borderRadius:"15px",left:"3rem"}} src={budget} />
        <img className="calc" style={{left:"1050px", width:"600px"}} src={calc}></img>
          <Card.Body className="w-100" style={{maxWidth:"400px"}}>
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
            <div className="w-100 text-center mt-2">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}