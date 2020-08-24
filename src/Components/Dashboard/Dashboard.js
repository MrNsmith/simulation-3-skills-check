import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      userPosts: [],
      showPosts: false,
    };
  }
  componentDidMount() {
    this.getPosts();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.showPosts !== this.state.showPosts) {
      this.getPosts();
    }
  }

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleToggle = () => {
    this.setState({ showPosts: !this.state.showPosts });
    this.checkBox();
  };

  checkBox = () => {
    axios
      .get(`/api/posts/${this.props.user["user_id"]}`)
      .then((res) => this.setState({ userPosts: res.data }))
      .catch((err) => console.log(err));
  };
  getPosts = () => {
    axios
      .get(`/api/posts`)
      .then((res) => this.setState({ postList: res.data }))
      .catch((err) => console.log(err));
  };
  handleDelete = (id) => {
    axios
      .delete(`/api/posts/${id}`)
      .then(() => this.getPosts())
      .catch((err) => console.log(err));
  };
  render() {
    console.log(this.props.user["user_id"]);
    const mappedUserPosts = this.state.userPosts.map((post, i) => (
      <div key={i}>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <img src={post.img} alt="Helo Post" className="post-image" />
        <p>{post.username}</p>
      </div>
    ));
    console.log(mappedUserPosts);
    const mappedPosts = this.state.postList.map((posts, i) => (
      <div key={i} className="post-box">
        <h1>{posts.title}</h1>
        <p>{posts.content}</p>
        <img src={posts.img} alt="Helo Post" className="post-image" />
        <p>{posts.username}</p>
        <button onClick={() => this.handleDelete(posts.post_id)}>Delete</button>
      </div>
    ));

    return (
      <div className="Dash-area">
        {/* {post_id, title, img, content, author_id}) */}
        <div>
          <input
            type="checkbox"
            name="showPosts"
            id="checkbox"
            onChange={this.handleToggle}
            checked={this.state.showPosts}
          />
          <label>My Posts</label>

          {this.state.showPosts ? mappedUserPosts : mappedPosts}
        </div>
        <div></div>
      </div>
    );
  }
}
const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps)(Dashboard);
