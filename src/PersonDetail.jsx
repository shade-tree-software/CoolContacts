import React from 'react'

export default class PersonDetail extends React.Component {
  constructor() {
    super()
    this.state = {person: {firstName: '', lastName: '', address: '', phone: ''}}
  }

  getPersonDetails = () => {
    fetch('/api/people/' + this.props.match.params._id).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({person: data})
    })
  }

  componentDidMount() {
    this.getPersonDetails()
  }

  render() {
    return (
      <div>
        <br/>
        <h1>{this.state.person.firstName + ' ' + this.state.person.lastName}</h1>
        <table className="table table-hover table-responsive">
          <tbody>
          <tr>
            <th scope="row">Address:</th>
            <td>{this.state.person.address}</td>
          </tr>
          <tr>
            <th scope="row">Phone:</th>
            <td>{this.state.person.number}</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}