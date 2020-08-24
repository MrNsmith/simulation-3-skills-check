import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import{connect} from 'react-redux'
import{getUser} from '../../redux/reducer'
import './Nav.css'
import axios from 'axios';

class Nav extends Component {
    constructor(props){
        super(props)
        this.state ={
            user:[]
        }
    }
    componentDidMount(){
        this.logMeIn()
    }
   logMeIn=()=>{
       axios.get(`/api/session`)
       .then(res => {
           console.log(res.data, 'nav res.data')
           this.props.getUser(res.data);
       })
   }

    render(){
        return(
            
            <div className= 'nav-bar'>
               
                <nav className='nav-links'>

                    <h1>{this.props.user.username}</h1>
                    <img src={this.props.user.profile_pic} alt={this.props.user.username}/>
                    <nav><Link to = '/dashboard'>Home</Link></nav> 
                    <nav><Link to = '/new'>Search Post</Link></nav>
                    <nav><Link to = '/create'>New Post</Link></nav>
                    <nav><Link to= '/'>Logout</Link></nav>
               
                </nav>
                
                
            </div>
          
        )
    }
}

const mapStateToProps = state => {
    return {
        user : state.user
    }
};

export default connect(mapStateToProps,{getUser})(Nav)