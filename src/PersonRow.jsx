import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export default class PersonRow extends React.Component {
  clickHandler = (e) => {
    e.preventDefault();
    this.props.deletePerson(this.props.person._id)
  }

  render() {
    let link = "/people/" + this.props.person._id
    return (
      <tr>
        <td><Link to={link}>?</Link></td>
        <td>{this.props.person.firstName}</td>
        <td>{this.props.person.lastName}</td>
        <td>{this.props.person.number}</td>
        <td>
          <form action=" person/delete" method=" post">
            <input hidden readOnly name=" _id" value={this.props.person._id}/>
            <button onClick={this.clickHandler}
                    type=" submit"
                    className=" btn btn-sm btn-danger">Delete
            </button>
          </form>
        </td>
      </tr>
    )
  }
}
