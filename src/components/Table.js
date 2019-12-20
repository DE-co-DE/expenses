import React, { Component } from 'react';
import axios from 'axios';
import Select from './Select';
import Checkbox from './Checkbox';
import { URL } from '../config/constants';
class Table extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      products: [],
      select: []
    };
  }
  async componentDidMount() {
    const response = await axios.get(`${URL}vendors`);
    const result = await response.data;
    this.setState({ data: result });
    //   console.log(result);
  }
  getByName = async (rowid, id, name) => {
    console.log(rowid, id);
    const response = await axios.get(`${URL}vendors/${id}/products`);
    const result = await response.data;
    const copy = this.state.data.slice();
    const row = { ...this.state.data[rowid.id - 1] };
    row.createdAt = name;
    copy[rowid.id - 1] = row;
    this.setState({
      products: {
        ...this.state.products,
        [rowid.id]: result
      },
      data: copy
    });
  };
  checkRow = (e, row) => {
    let selectArray = this.state.select.slice();
    if (e === true) {
      selectArray.push(row.id);
    } else {
      selectArray = selectArray.filter(id => id !== row.id);
    }

    this.setState({ select: selectArray });
  };
  render() {
    const { select } = this.state;
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>id</th>
            <th>name</th>
            <th>Description</th>
            <th>created at</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(row => {
            return (
              <tr
                key={row.id}
                className={select.includes(row.id) ? 'selected' : ''}
              >
              <td><Checkbox checkRow={this.checkRow} row={row} /></td>
                <td>{row.id}</td>
                <td>
                  <Select
                    data={this.state.data}
                    getByName={this.getByName}
                    row={row}
                  />
                </td>
                <td>
                  {this.state.products[row.id] !== undefined ? (
                    <Select
                      data={this.state.products[row.id]}
                      disabled="disabled"
                    />
                  ) : (
                    row.description
                  )}
                </td>
                <td>{row.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
