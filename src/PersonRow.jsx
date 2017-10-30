import React from 'react'

export default class PersonRow extends React.Component {
  onClickDelete = (e) => {
    e.stopPropagation();
    this.props.deletePerson(this.props.person._id)
  }

  onClickRow = () => {
    this.props.history.push('/people/' + this.props.person._id)
  }

  render() {
    return (
        <tr onClick={this.onClickRow}>
          <td>{this.props.person.firstName}</td>
          <td>{this.props.person.lastName}</td>
          <td>
            <button onClick={this.onClickDelete} className="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
    )
  }
}
