import React, { Component } from "react";
import "./counter.css";

class Counter extends Component {
  render() {
    const { onIncrement, onDecrease, onDelete, counter } = this.props;
    return (
      <div className="row justify-content-start align-items-center">
        <div className="col-sm-1">
          <span id="app-counter" className={this.getBadgeClasses(counter)}>
            {this.formatCount(counter)}
          </span>
        </div>
        <div className="col-sm-variable">
          <button
            onClick={() => onIncrement(counter)}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
          <button
            onClick={() => onDecrease(counter)}
            className={this.getDecreaseButtonClass(counter)}
          >
            -
          </button>
          <button
            onClick={() => onDelete(counter.id)}
            className="btn btn-danger btn-sm m-2"
          >
            x
          </button>
        </div>
      </div>
    );
  }
  formatCount(counter) {
    return counter.value === 0 ? "Zero" : counter.value;
  }
  getBadgeClasses(counter) {
    let classes = " badge m-2 badge-";
    classes += counter.value === 0 ? "warning" : "primary";
    return classes;
  }
  getDecreaseButtonClass(counter) {
    let classes = "btn btn-secondary btn-sm ";
    classes += counter.value === 0 ? "disabled" : "";
    return classes;
  }
}

export default Counter;
