import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'

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
          <NavBar/>
          <div className="container">
            <Route exact path="/" component={LoginForm}/>
            <Route path="/main" component={MainPage}/>
            <Route path="/about" component={About}/>
            <Route path="/people/:_id" component={PersonDetail}/>
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