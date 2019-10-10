import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .label("Username")
      .required(),
    password: Joi.string()
      .label("Password")
      .required()
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      window.location = this.props.location.state
        ? this.props.location.state.from.pathname
        : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("Username", "username")}
        {this.renderInput("Password", "password", "password")}
        {this.renderButton("Login")}
      </form>
    );
  }
}

export default LoginForm;
