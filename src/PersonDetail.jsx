import React from 'react'

class PersonFieldForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: this.props.value}
  }

  changeHandler = (e) => {
    this.setState({value: e.target.value})
  }

  onOKClick = () => {
    fetch('/api/people/' + this.props._id + '?token=' + sessionStorage.authToken, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify({name: this.props.name, value: this.state.value})
    }).then(() => {
      this.props.onDone(this.state.value)
    })
  }

  onCancelClick = () => {
    this.props.onDone(null)
  }

  render() {
    return (
      <span><input onChange={this.changeHandler} defaultValue={this.state.value}/><span> </span>
        <button type="button" className="btn btn-primary btn-sm" onClick={this.onOKClick}>OK</button>
        <span> </span>
        <button type="button" className="btn btn-primary btn-sm" onClick={this.onCancelClick}>Cancel</button></span>
    )
  }
}

class PersonField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: this.props.value, editing: false}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value})
  }

  onEditClick = () => {
    this.setState({editing: true});
  }

  onDone = (newValue) => {
    if (newValue) {
      this.setState({value: newValue})
    }
    this.setState({editing: false});
  }

  render() {
    let val = null
    if (this.state.editing) {
      val = <PersonFieldForm onDone={this.onDone}
                             name={this.props.name}
                             value={this.state.value}
                             _id={this.props._id}/>
    } else {
      val = <span>{this.state.value}<span> </span>
        <button type="button" className="btn btn-primary btn-sm" onClick={this.onEditClick}>Edit</button>
      </span>
    }
    return val
  }
}

export default class PersonDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {person: {firstName: '', lastName: '', address: '', phone: ''}}
  }

  getPersonDetails = () => {
    fetch('/api/people/' + this.props.match.params._id + '?token=' + sessionStorage.authToken).then((response) => {
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
        <h1>{this.state.person.firstName} {this.state.person.lastName}</h1>
        <table className="table table-hover table-responsive">
          <tbody>
          <tr>
            <th scope="row">Address:</th>
            <td><PersonField name="address"
                             value={this.state.person.address}
                             _id={this.state.person._id}/></td>
          </tr>
          <tr>
            <th scope="row">Phone:</th>
            <td><PersonField name="number"
                             value={this.state.person.number}
                             _id={this.state.person._id}/></td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}