import React, { Component } from "react";
import http from "./httpService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import config from "./config.json";
class App extends Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    const { data } = await http.get(config.apiEndPoint);
    this.setState({ posts: data });
  }
  handleAdd = async () => {
    const obj = { title: "a", body: "isbum" };
    const { data: post } = await http.post(config.apiEndPoint, obj);
    this.setState({ posts: [post, ...this.state.posts] });
  };

  handleUpdate = async post => {
    const originalPosts = this.state.posts;
    post.title = `Update ${post.title}}`;
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = post;
    this.setState({ posts });
    try {
      await http.put(config.apiEndPoint + "/" + post.id, post);
    } catch (ex) {
      this.setState({ posts: originalPosts });
    }
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(x => x.id !== post.id);
    this.setState({ posts });
    try {
      await http.delete(config.apiEndPoint + `/${post.id}`);
    } catch (ex) {
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
