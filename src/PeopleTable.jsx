import React from 'react'

import PeopleRows from './PeopleRows.jsx'

export default class PeopleTable extends React.Component {
  render() {
    return (
      <table className="table">
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <PeopleRows people={this.props.people} deletePerson={this.props.deletePerson}/>
        </tbody>
      </table>
    )
  }
}
