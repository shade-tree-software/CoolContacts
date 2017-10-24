import React from 'react'

import PersonRow from './person-row.jsx'

export default class PeopleRows extends React.Component {
  render() {
    return (
      this.props.people.map((person) =>
        <PersonRow key={person._id}
                   person={person}
                   deletePerson={this.props.deletePerson}/>
      )
    )
  }
}