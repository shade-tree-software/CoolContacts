import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

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
      <NavLink className="nav-link nav-item" exact activeClassName="active" to="/">Home</NavLink>
      <NavLink className="nav-link nav-item" activeClassName="active" to="/about">About</NavLink>
    </div>
  </nav>
)

class PersonDetail extends React.Component {
  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props.match)}</p>
      </div>
    )
  }
}

const App = () => (
  <Router>
    <div>
      <NavBar/>
      <div className="container">
        <Route exact path="/" component={MainPage}/>
        <Route path="/about" component={About}/>
        <Route path="/people/:_id" component={PersonDetail}/>
      </div>
    </div>
  </Router>
)

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);