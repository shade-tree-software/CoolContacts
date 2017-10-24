import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Clock from './Clock.jsx'
import NewPersonForm from './NewPersonForm.jsx'
import PeopleTable from './PeopleTable.jsx'

class MainPage extends React.Component {
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
        <br/>
        <NewPersonForm addNewPerson={this.addNewPerson}/>
        <br/>
        <br/>
        <PeopleTable people={this.state.people} deletePerson={this.deletePerson}/>
      </div>
    )
  }
}

const About = () => (
  <div>
    <h1>About</h1>
    <p>Contacts v1.0</p>
  </div>
)

const NavBar = () => (
  <nav className="navbar navbar-expand-md bg-light">
    <a className="navbar-brand" href="#">Contacts</a>
    <div className="navbar-nav">
      <Link className="nav-link nav-item" to="/">Home</Link>
      <Link className="nav-link nav-item" to="/about">About</Link>
    </div>
  </nav>
)

const App = () => (
  <Router>
    <div>
      <NavBar/>
      <div className="container">
        <Route exact path="/" component={MainPage}/>
        <Route path="/about" component={About}/>
      </div>
    </div>
  </Router>
)

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);