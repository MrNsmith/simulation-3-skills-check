import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
class Form extends Component {
    constructor(props){
        super(props)
        this.state = { 
         search:'',
         userPosts:null
        }
    }
    handleInput=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    searchPost=() =>{
     const {search}= this.state
     console.log(search)
     axios.get(`/api/post/${search}`)
     .then(res => {
         this.setState({
             userPosts: res.data
         })
         
     })
     .catch(err => console.log(err))
 }
    render(){
        console.log(this.state.userPosts)
        return(
            <div className='Dash-area'> 
            <input
            value={this.state.search}
            name='search'
            placeholder='search by title'
            onChange={(e)=>this.handleInput(e)}
            />
             <button onClick={this.searchPost}>search</button>

             {!this.state.userPosts?null:
                    <div>
                        {this.state.userPosts[0].title}
                       <img src={this.state.userPosts[0].img} alt={this.state.userPosts[0].username}/>
                        {this.state.userPosts[0].content}
                    </div>
             }
            </div>
            
        )
    }
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Form);