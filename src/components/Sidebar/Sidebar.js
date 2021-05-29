import React, { useState } from 'react'
import budget from './budget.png';
import user from '../Sidebar/user.svg';
import {SidebarData} from './SidebarData';
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from "react-router-dom"
import {
    Button    
} from "react-bootstrap";

function Sidebar() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    
  
    async function handleLogout() {
      setError("")
  
      try {
        await logout()
        history.push("/login")
      } catch {
        setError("Failed to log out")
      }
    }
    return (
        <div className='Sidebar'>
            <ul className='SidebarList'>
            <img className='img' alt='logo' src={budget}/>
            <div className='text-center'>
             
            </div>
 
            {SidebarData.map((val,key) => {
                return (
                    <li key={key} className='row' id={window.location.pathname === val.link ? "active" : ""} onClick={() => {window.location.pathname = val.link}}>
                        {" "}
                     <div id='icon'>{val.icon}</div>{" "}
                     <div id='title'>{val.title}</div>
                     </li>
               );
            })}
            </ul>
            <div className="text-white user text-center">
                <p><img style={{width:"50px"}} src={user}/><br></br>{currentUser.email.split('@')[0]}</p>
                <Link to="/update-profile" className="btn btn-primary ">
                    Update Profile
                </Link> 
                <p></p>
                <Button variant="primary" onClick={handleLogout}>
                    Log out
                </Button>  
            </div> 
        </div>
    )
}

export default Sidebar
