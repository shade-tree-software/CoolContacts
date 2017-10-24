import React from 'react'
import ReactDOM from 'react-dom'

import Clock from './Clock.jsx'
import NewPersonForm from './NewPersonForm.jsx'
import PeopleTable from './PeopleTable.jsx'

class App extends React.Component {
  constructor() {
    super()
    this.state = {people: []}
  }

  getLatestPeople = () => {
    fetch('/people').then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({people: data})
    })
  }

  componentDidMount() {
    this.getLatestPeople()
    this.timerId = setInterval(this.getLatestPeople, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  addNewPerson = (person) => {
    fetch('people/new', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({person})
    }).then(this.getLatestPeople)
  }

  deletePerson = (_id) => {
    fetch('people/' + _id, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'delete'
    }).then(this.getLatestPeople)
  }

  render() {
    return (
      <div>
        <h1>Contacts</h1>
        <Clock/>
        <NewPersonForm addNewPerson={this.addNewPerson}/>
        <br/>
        <br/>
        <PeopleTable people={this.state.people} deletePerson={this.deletePerson}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);