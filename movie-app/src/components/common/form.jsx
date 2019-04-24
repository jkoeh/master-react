import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import DropDown from "./dropDown";
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validateForm = () => {
    const option = { abortEarly: false, stripUnknown: true };
    const { error } = Joi.validate(this.state.data, this.schema, option);
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
    this.doSubmit();
  };
  handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({ errors });
    const data = this.state.data;
    data[input.name] = input.value;
    this.setState({ errors, data });
  };
  renderButton = label => {
    return (
      <button disabled={this.validateForm()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderInput = (label, name, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        label={label}
        value={data[name]}
        name={name}
        onChange={this.handleInputChange}
        error={errors[name]}
        type={type}
      />
    );
  };
  handleSelection = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });

    const data = this.state.data;
    data[input.name] = input.value;
    this.setState({ errors, data });
  };
  renderDropdown = (label, name, selections) => {
    const { errors, data } = this.state;
    return (
      <DropDown
        label={label}
        value={data[name]}
        name={name}
        onChange={this.handleSelection}
        error={errors[name]}
        selections={selections}
      />
    );
  };
}

export default Form;
