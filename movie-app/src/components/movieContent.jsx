import React, { Component } from "react";
class MovieContent extends Component {
  onSave() {
    this.props.history.goBack();
  }
  render() {
    const id = this.props.match.params.id;

    return (
      <div className="container">
        <h1>Movie from {id}</h1>
        <button onClick={() => this.onSave()}>Save</button>
      </div>
    );
  }
}

export default MovieContent;
