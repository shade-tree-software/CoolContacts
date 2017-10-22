//import React from 'react';
//import ReactDOM from 'react-dom';

class NewPerson extends React.Component {
  render() {
    return (
      <form action="person/new" method="post">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <input name="name" className="form-control" placeholder="Name"/><br/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <input name="number" className="form-control" placeholder="Phone Number"/><br/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <button type="submit" className="btn btn-primary float-right">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

class Person extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.number}</td>
        <td>
          <form action="person/delete" method="post">
            <input hidden readOnly name="id" value="<%= person._id %>"/>
            <button type="submit" className="btn btn-sm btn-danger">Delete</button>
          </form>
        </td>
      </tr>
    )
  }
}

class People extends React.Component {
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
        <Person name="Andrew" number="703-801-5116"/>
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
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
      date: new Date()
    });
  }

  render(){
    return(
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
        <People/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);