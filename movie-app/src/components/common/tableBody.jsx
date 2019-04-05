import React, { Component } from "react";
import Like from "./like";
class TableBody extends Component {
  render() {
    const { items, columns, onLike, onDelete } = this.props;
    return (
      <tbody>
        {items.map(item => (
          <tr key={item._id}>
            <th scope="row">{item.title}</th>
            <td>{item.genre.name}</td>
            <td>{item.numberInStock}</td>
            <td>{item.dailyRentalRate}</td>
            <td>
              <Like liked={item.liked} onLike={e => onLike(item)} />
            </td>
            <td>
              <button
                onClick={e => onDelete(item._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
