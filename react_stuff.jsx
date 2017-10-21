//import React from 'react';
//import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <h1>Contacts</h1>
    <form action="person/new" method="post">
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <input name="name" className="form-control" placeholder="Name"/><br/>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <input name="number" className="form-control" placeholder="Phone Number"/><br/>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <button type="submit" className="btn btn-primary float-right">Submit</button>
        </div>
      </div>
    </form>
    <br/>
    <br/>
  </div>,
  document.getElementById('root')
);