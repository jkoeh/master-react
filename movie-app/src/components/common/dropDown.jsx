import React from "react";
const DropDown = ({ value, name, label, error, selections, onChange }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          className="form-control"
        >
          {selections &&
            selections.map(x => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDown;
