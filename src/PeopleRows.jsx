import React from 'react'

import PersonRow from './PersonRow.jsx'

export default class PeopleRows extends React.Component {
  render() {
    return (
      this.props.people.map((person) =>
        <PersonRow key={person._id}
                   history={this.props.history}
                   person={person}
                   deletePerson={this.props.deletePerson}/>
      )
    )
  }
}