import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import NavBar from './NavBar.jsx'
import MainPage from './MainPage.jsx'
import About from './About.jsx'
import PersonDetail from './PersonDetail.jsx'
import LoginForm from './LoginForm.jsx'
import addPropsToRoute from './addPropsToRoute.jsx'

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
          <Route path="/" component={addPropsToRoute(NavBar, {clearAuthToken: this.clearAuthToken})}/>
          <div className="container">
            <Route exact path="/" render={(props) => (this.state.authToken ?
              <MainPage {...props} authToken={this.state.authToken}/> :
              <Redirect to="/login"/>)}/>
            <Route path="/login" component={addPropsToRoute(LoginForm, {saveAuthToken: this.saveAuthToken})}/>
            <Route path="/main" render={(props) => (this.state.authToken ?
              <MainPage {...props} authToken={this.state.authToken}/> :
              <Redirect to="/login"/>)}/>
            <Route path="/about" render={() => (this.state.authToken ? <About/> : <Redirect to="/login"/>)}/>
            <Route path="/people/:_id" render={(props) => (this.state.authToken ?
              <PersonDetail {...props} authToken={this.state.authToken}/> :
              <Redirect to="/login"/>)}/>
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App/>
  ,
  document.getElementById('root')
);