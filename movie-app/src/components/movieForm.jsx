import React from "react";

import Form from "./common/form";
import { getGenres } from "../services/genreService";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/movieService";

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
  async populateGenres() {
    let { data: genres } = await getGenres();
    genres.unshift({ _id: "", name: "" });
    this.setState({ genres });
  }
  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data } = await getMovie(movieId);
      data.genreId = data.genre._id;
      delete data.genre;
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }
  async doSubmit() {
    const data = await saveMovie(this.state.data);
    if (typeof data === "string") {
      const errors = { title: data };
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
