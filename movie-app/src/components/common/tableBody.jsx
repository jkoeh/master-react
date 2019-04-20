import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  renderCell(item, column) {
    if (column.content) {
      //handles component generation
      return column.content(item);
    } else {
      //handles complex path such as genre.path
      return _.get(item, column.path);
    }
  }
  returnKey(item, column) {
    return item._id + (column.path || column.key);
  }
  render() {
    const { items, columns } = this.props;
    return (
      <tbody>
        {items.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.returnKey(item, column)}>
                {this.renderCell(item, column, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}
export default TableBody;
