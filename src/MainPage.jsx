import React from 'react'

import NewPersonForm from './NewPersonForm.jsx'
import PeopleTable from './PeopleTable.jsx'

export default class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {people: []}
  }

  componentDidMount() {
    this.getLatestPeople()
    this.timerId = setInterval(this.getLatestPeople, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  getLatestPeople = () => {
    fetch('api/people').then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({people: data})
    })
  }

  addNewPerson = (person) => {
    fetch('api/people', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({person})
    }).then(this.getLatestPeople)
  }

  deletePerson = (_id) => {
    fetch('api/people/' + _id, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'delete'
    }).then(this.getLatestPeople)
  }

  render() {
    return (
      <div>
        <br/>
        <NewPersonForm addNewPerson={this.addNewPerson}/>
        <br/>
        <br/>
        <PeopleTable history={this.props.history} people={this.state.people} deletePerson={this.deletePerson}/>
      </div>
    )
  }
}
