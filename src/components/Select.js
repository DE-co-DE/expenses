import React, { Component } from 'react';

class Select extends Component {
  render() {
    const { disabled, data, row, getByName } = this.props;
    return (
      <select
        onChange={Event => getByName(row, Event.target.value , Event.target.selectedOptions[0].innerText)}
        disabled={disabled}
      >
        {data.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }
}

export default Select;
