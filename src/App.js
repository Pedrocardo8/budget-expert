import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Budget from './pages/Budget';
import Goals from './pages/Goals';
import Investments from './pages/Investments';
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";

function App() {

  return (
    <div>          
      <Router>          
        <AuthProvider> 
              <Switch>
                    {/*<Route path='/' exact render={() => <Dashboard  /> } />
                    <Route path='/expenses'  render={() => <Expenses /> } />
                    <Route path='/goals'  render={() => <Goals /> } />
                    <Route path='/budget' render={() => <Budget /> } />
                    <Route path='/investments' render={() => <Investments /> } />
                    <Route path="*" render={() => <Dashboard /> } />*/} 
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <PrivateRoute exact path="/expenses" component={Expenses} />   
                <PrivateRoute exact path="/goals" component={Goals} />   
                <PrivateRoute exact path="/budget" component={Budget} />  
                <PrivateRoute exact path="/investments" component={Investments} />               
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />              
              </Switch>                  
           </AuthProvider>    
      </Router> 
                
    </div>
  );
}

export default App;
