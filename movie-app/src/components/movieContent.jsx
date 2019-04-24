import React, { Component } from "react";
import MovieForm from "./movieForm";
import { getMovie } from "../services/fakeMovieService";
class MovieContent extends Component {
  componentWillMount() {
    const id = this.props.match.params.id;
    const movie = getMovie(id);

    if (movie) {
      this.setState({ movie });
    } else {
      this.props.history.push("/not-found");
    }
  }
  renderForm() {
    if (this.state && this.state.movie) {
      return <MovieForm data={this.state.movie} history={this.props.history} />;
    }
  }
  render() {
    return <div className="container">{this.renderForm()}</div>;
  }
}

export default MovieContent;
