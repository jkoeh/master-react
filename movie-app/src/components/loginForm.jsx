import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
class LoginForm extends Component {
  state = {
    account: {
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
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validateForm = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, option);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;

    //call server
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({ errors });
    const account = this.state.account;
    account[input.name] = input.value;
    this.setState({ errors, account });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          label="Username"
          value={account.username}
          name="username"
          onChange={this.handleChange}
          error={errors.username}
        />
        <Input
          label="Password"
          value={account.password}
          name="password"
          onChange={this.handleChange}
          error={errors.password}
        />
        <button disabled={this.validateForm()} className="btn btn-primary">
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
