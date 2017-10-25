import React from 'react'

export default class PersonDetail extends React.Component {
  constructor() {
    super()
    this.state = {person: []}
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
        <table className="table table-responsive">
          <tbody>
          <tr><th scope="row">Phone:</th><td>{this.state.person.number}</td></tr>
          </tbody>
        </table>
      </div>
    )
  }
}