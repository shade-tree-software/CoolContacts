import React from 'react'
import {NavLink} from 'react-router-dom'

export default class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md bg-light">
        <a className="navbar-brand" href="#">Contacts</a>
        <div className="navbar-nav">
          <NavLink className="nav-link nav-item" activeClassName="active" to="/main">Home</NavLink>
          <NavLink className="nav-link nav-item" activeClassName="active" to="/about">About</NavLink>
        </div>
      </nav>
    )
  }
}