import React, { Component } from 'react';
import axios from 'axios';
import Select from './Select';
class Table extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      products: []
    };
  }
  async componentDidMount() {
    const response = await axios.get(
      'https://5ddf6a9d4a658b0014c4898b.mockapi.io/vendors'
    );
    const result = await response.data;
    this.setState({ data: result });
    //   console.log(result);
  }
  getByName = async (rowid, id) => {
    console.log(rowid, id);
    const response = await axios.get(
      'https://5ddf6a9d4a658b0014c4898b.mockapi.io/vendors/' + id + '/products'
    );
    const result = await response.data;
    //console.log(result);
    this.setState(
      {
        products: {
          ...this.state.products,
          [rowid.id]: result
        }
      },
      () => {
        console.log(this.state.products);
      }
    );
  };
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>Description</th>
            <th>created at</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(row => {
            return (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <Select
                    data={this.state.data}
                    getByName={this.getByName}
                    row={row}
                  />
                </td>
                <td>
                  {this.state.products[row.id] != undefined ? (
                    <Select data={this.state.products[row.id]} /> // console.log(this.state.products[row.id], row.id)
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
