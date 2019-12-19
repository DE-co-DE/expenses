import React, { Component } from 'react';

class Select extends Component {
  render() {
    return (
      <select
        onChange={Event =>
          this.props.getByName(this.props.row, Event.target.value)
        }
      >
        {this.props.data.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }
}

export default Select;
