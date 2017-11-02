import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import NavBar from './NavBar.jsx'
import MainPage from './MainPage.jsx'
import About from './About.jsx'
import PersonDetail from './PersonDetail.jsx'
import LoginForm from './LoginForm.jsx'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={NavBar}/>
          <div className="container">
            <Route exact path="/" render={(props) => (
              sessionStorage.authToken ? <MainPage {...props}/> : <Redirect to="/login"/> )}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/main" render={(props) => (
              sessionStorage.authToken ? <MainPage {...props}/> : <Redirect to="/login"/> )}/>
            <Route path="/about" render={() => (
              sessionStorage.authToken ? <About/> : <Redirect to="/login"/> )}/>
            <Route path="/people/:_id" render={(props) => (
              sessionStorage.authToken ? <PersonDetail {...props}/> : <Redirect to="/login"/>)}/>
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