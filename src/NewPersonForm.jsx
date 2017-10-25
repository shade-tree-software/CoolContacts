import React from 'react'

export default class NewPersonForm extends React.Component {
  static defaultState = {firstName: '', lastName: '', number: '', address: ''}

  constructor() {
    super()
    this.state = NewPersonForm.defaultState
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.addNewPerson(this.state)
    this.setState(NewPersonForm.defaultState)
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
        <form onSubmit={this.submitHandler} action="person/new" method="post">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-5">
              <input name="firstName"
                     className="form-control"
                     placeholder="First Name"
                     value={this.state.firstName}
                     onChange={this.changeHandler}/><br/>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-5">
              <input name="lastName"
                     className="form-control"
                     placeholder="Last Name"
                     value={this.state.lastName}
                     onChange={this.changeHandler}/><br/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <input name="address"
                     className="form-control"
                     placeholder="Address"
                     value={this.state.address}
                     onChange={this.changeHandler}/><br/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-5">
              <input name="number"
                     className="form-control"
                     placeholder="Phone Number"
                     value={this.state.number}
                     onChange={this.changeHandler}/><br/>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-5">
              <button type="submit"
                      className="btn btn-primary float-right">Add
              </button>
            </div>
          </div>
        </form>
    )
  }
}
