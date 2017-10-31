import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import NavBar from './NavBar.jsx'
import MainPage from './MainPage.jsx'
import About from './About.jsx'
import PersonDetail from './PersonDetail.jsx'
import LoginForm from './LoginForm.jsx'

class App extends React.Component {
  constructor() {
    super()
    this.state = {authToken: null}
  }

  saveAuthToken = (authToken) => {
    this.setState({authToken})
  }

  clearAuthToken = () => {
    this.saveAuthToken(null)
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={props => <NavBar {...props} clearAuthToken={this.clearAuthToken}/>}/>
          <div className="container">
            <Route exact path="/" component={props => <LoginForm {...props} saveAuthToken={this.saveAuthToken}/>}/>
            <Route path="/main" component={props => <MainPage {...props} authToken={this.state.authToken}/>}/>
            <Route path="/about" component={About}/>
            <Route path="/people/:_id"
                   component={props => <PersonDetail {...props} authToken={this.state.authToken}/>}/>
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);