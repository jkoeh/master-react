import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };
  schema = {
    username: Joi.string()
      .label("Username")
      .email()
      .required(),
    password: Joi.string()
      .label("Password")
      .min(5)
      .required(),
    name: Joi.string()
      .label("Name")
      .required()
  };
  doSubmit = async () => {
    try {
      const { headers } = await userService.register(this.state.data);
      localStorage.setItem("token", headers["x-auth-token"]);
      window.location = "/";
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
        {this.renderInput("Name", "name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default RegisterForm;
