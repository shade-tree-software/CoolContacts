import React from 'react'

export default class PersonRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {smallCollapsed: true}
  }

  onClickDelete = (e) => {
    e.stopPropagation();
    this.props.deletePerson(this.props.person._id)
  }

  onClickEdit = (e) => {
    e.stopPropagation();
    this.props.history.push('/people/' + this.props.person._id)
  }

  onToggleExpanded = () => {
    this.setState((prevState) => {
      return {smallCollapsed: !prevState.smallCollapsed}
    })
  }

  render() {
    let hideOnSmCollapsed = this.state.smallCollapsed ? 'hidden-on-sm-collapsed' : ''
    let showOnSmCollapsed = this.state.smallCollapsed ? 'small-only' : 'small-only hidden-on-sm-collapsed'
    return (
      <tr className="stackable" onClick={this.onToggleExpanded}>
        <td className={showOnSmCollapsed}>
          <span>{this.props.person.firstName} {this.props.person.lastName} </span>
          <button onClick={this.onClickEdit} className="btn btn-sm btn-primary float-right">Edit</button>
        </td>
        <td className={hideOnSmCollapsed}><span className="small-only bold-text">First Name: </span>{this.props.person.firstName}</td>
        <td className={hideOnSmCollapsed}><span className="small-only bold-text">Last Name: </span>{this.props.person.lastName}</td>
        <td className={hideOnSmCollapsed}>
          <button onClick={this.onClickEdit} className="btn btn-sm btn-primary large-only">Edit</button>
          <span> </span>
          <button onClick={this.onClickDelete} className="btn btn-sm btn-danger">Delete</button>
          <button onClick={this.onClickEdit} className="btn btn-sm btn-primary float-right small-only">Edit</button>
        </td>
      </tr>
    )
  }
}
