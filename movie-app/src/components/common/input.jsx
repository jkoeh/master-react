import React from "react";
const Input = ({ value, name, label, onChange, error }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          type="text"
          className="form-control"
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
