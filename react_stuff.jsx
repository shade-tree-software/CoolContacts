//import React from 'react';
//import ReactDOM from 'react-dom';

class NewPerson extends React.Component {
  constructor(){
    super()
    this.state={name:'',number:''}
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log('name: ' + this.state.name + ', number: ' + this.state.number);
  }

  changeHandler = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <form onSubmit={this.submitHandler} action="person/new" method="post">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <input name="name"
                   className="form-control"
                   placeholder="Name"
                   value={this.state.name}
                   onChange={this.changeHandler}/><br/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <input name="number"
                   className="form-control"
                   placeholder="Phone Number"
                   value={this.state.number}
                   onChange={this.changeHandler}/><br/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <button type="submit"
                    className="btn btn-primary float-right">Submit
            </button>
          </div>
        </div>
      </form>
    )
  }
}

class Person extends React.Component {
  clickHandler = (e) => {
    e.preventDefault();
    console.log('delete person');
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.number}</td>
        <td>
          <form action="person/delete" method="post">
            <input hidden readOnly name="id" value={this.props.id}/>
            <button onClick={this.clickHandler}
                    type="submit"
                    className="btn btn-sm btn-danger">Delete
            </button>
          </form>
        </td>
      </tr>
    )
  }
}

class People extends React.Component {
  constructor() {
    super()
    this.state = {people: []}
  }

  tick = () => {
    this.setState({
      people: [
        {id: 1, name: 'Andrew', number: '703-801-5116'},
        {id: 2, name: 'Donna', number: '703-927-4117'}
      ]
    })
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      this.state.people.map((person) =>
        <Person key={person.id}
                id={person.id}
                name={person.name}
                number={person.number}/>
      )
    )
  }
}

class PeopleTable extends React.Component {
  render() {
    return (
      <table className="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <People/>
        </tbody>
      </table>
    )
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Contacts</h1>
        <Clock/>
        <NewPerson/>
        <br/>
        <br/>
        <PeopleTable/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);