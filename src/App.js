import React, {Component} from 'react';
import routes from './routes'
import Nav from './Components/Nav/Nav';
import {withRouter} from 'react-router-dom'
import './App.css';


function App (props){
      return(
            <div className='App'>
            
             {props.location.pathname === '/'? null: <Nav
             history ={props.location}
             />}
              {routes}
              
            </div>
        )
    
}

export default withRouter(App);