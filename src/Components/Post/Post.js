import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import '../Auth/Auth.css'


class Post extends Component {
    constructor(props){
        super(props)
        this.state={
             
                title:'',
                content:'',
                img:''
            
           
            


            
        }
    }
  handleInput=(event)=>{
    this.setState({
        [event.target.name]:event.target.value
    })
  }
  resetFn=()=>{
      this.setState({title:'',content:'',img:''})
  }
  addPost =()=>{
      const {title, content, img } = this.state;
      axios
      .post('/api/create', {title, img, content, author_id: this.props.user["user_id"]})
      .then((res) => res.sendStatus(200))
      .catch((err)=>console.log(err))
  }
 

    render(){
        return(
           <div className='Dash-area'>
               <h1>create post</h1>
               <form className='form'>
               <input
               
               placeholder='Title'
               type='text'
               name='title'
               onChange={(e)=>this.handleInput(e)}
               />
               
               <input
               placeholder='Img URL'
               type='text'
               name='img'
               onChange={(e)=>this.handleInput(e)}

               />
               <input
               placeholder='What do you have to say'
               type='text'
               name='content'
               onChange={(e)=>this.handleInput(e)}
               />
               
               <button onClick={this.addPost}>Submit</button>
               <button onClick={this.resetFn}>Reset</button>
               </form>
              


           </div>
        )
    }
}
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Post);
