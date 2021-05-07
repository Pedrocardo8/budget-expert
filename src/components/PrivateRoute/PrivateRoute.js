import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Sidebar from "../Sidebar/Sidebar"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? 
        (<div>
          <Sidebar/>
          <Component {...props} />
          </div>
          ) : <Redirect to="/login" />
      }}
    ></Route>
  )
}