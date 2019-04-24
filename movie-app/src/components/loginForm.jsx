import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

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

  doSubmit = e => {
    console.log("Submitted");
  };

  render() {
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
