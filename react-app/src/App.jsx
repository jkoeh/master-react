import React, { Component } from "react";
import Navbar from "./navbar";
import Counters from "./counters";
import "./App.css";
class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
      { id: 5, value: 0 }
    ]
  };
  handleIncrement = counter => {
    const counters = this.state.counters.map(x =>
      x.id === counter.id ? { ...counter, value: counter.value + 1 } : x
    );
    this.setState({ counters });
  };
  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };
  handleDelete = counterId => {
    const counters = this.state.counters.filter(x => x.id !== counterId);
    this.setState({ counters });
  };
  handleDecrease = counter => {
    const counters = this.state.counters.map(x =>
      x.id === counter.id && counter.value > 0
        ? { ...counter, value: counter.value - 1 }
        : x
    );
    this.setState({ counters });
  };
  render() {
    return (
      <React.Fragment>
        <Navbar
          totalCounters={this.state.counters
            .filter(x => x.value > 0)
            .reduce((x, y) => x + y.value, 0)}
        />
        <main role="main" className="container">
          <Counters
            counters={this.state.counters}
            onIncrement={this.handleIncrement}
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onDecrease={this.handleDecrease}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
