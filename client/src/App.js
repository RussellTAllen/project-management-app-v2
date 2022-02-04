import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//Components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  const isAuth = async() => {
    try{
      const response = await fetch('/api/auth/is-verify', {
        method: 'GET',
        headers: { token: localStorage.token }
      })

      const data = await response.json()

      data === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    }
    catch(err){
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  }, [])

  return (
    <div className="App">
      <h1>The App</h1>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/login" render={props => !isAuthenticated ? (
              <Login {...props} setAuth={setAuth} /> 
              ) : (
              <Redirect to="/dashboard" />
              )
            } />
            <Route path="/register" render={props => !isAuthenticated ? (
              <Register {...props} setAuth={setAuth} /> 
              ) : (
              <Redirect to="/login" />
              )
            } />
            <Route path="/dashboard" render={props => isAuthenticated ? (
              <Dashboard {...props} setAuth={setAuth} /> 
              ) : (
              <Redirect to="/login" />
              )
            } />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
