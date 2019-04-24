import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
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
  doSubmit = e => {
    console.log("Registered");
  };

  render() {
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
