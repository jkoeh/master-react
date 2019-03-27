import React, { Component } from "react";
import Counter from "./counter";
const Counters = ({ onReset, onDelete, onDecrease, onIncrement, counters }) => {
  return (
    <div>
      <button onClick={onReset} className="btn btn-primary btn-sm m-2">
        Reset
      </button>
      {counters.map(counter => (
        <Counter
          key={counter.id}
          counter={counter}
          onDelete={onDelete}
          onDecrease={onDecrease}
          onIncrement={onIncrement}
        >
          <h4>Counter #{counter.id}</h4>
        </Counter>
      ))}
    </div>
  );
};
export default Counters;
