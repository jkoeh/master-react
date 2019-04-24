import React from "react";

import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import Joi from "joi-browser";
import { saveMovie, getMovies } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {}
  };
  schema = {
    title: Joi.string()
      .label("Title")
      .required(),
    genreId: Joi.string()
      .label("Genre")
      .required(),
    numberInStock: Joi.number()
      .label("NumberInStock")
      .integer()
      .min(0)
      .max(100)
      .required(),
    dailyRentalRate: Joi.number()
      .label("Rate")
      .required()
      .min(0)
      .max(10)
  };
  componentWillMount() {
    const { data } = this.props;
    if (data) {
      this.setState({ data: { ...data, genreId: data.genre._id } });
    }
  }
  componentDidMount() {
    const genres = getGenres();
    genres.unshift({ _id: "", name: "" });
    this.setState({ genres });
  }
  doSubmit() {
    const resp = saveMovie(this.state.data);
    if (typeof resp === "string") {
      const errors = { title: resp };
      this.setState({ errors });
    } else {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "title")}
          {this.renderDropdown("Genre", "genreId", this.state.genres)}
          {this.renderInput("NumberInStock", "numberInStock")}
          {this.renderInput("Rate", "dailyRentalRate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
