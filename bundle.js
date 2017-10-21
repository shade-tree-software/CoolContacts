(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f
      }
      var l = n[o] = {exports: {}};
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, l, l.exports, e, t, n, r)
    }
    return n[o].exports
  }

  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  1: [function (require, module, exports) {
    "use strict";

//import React from 'react';
//import ReactDOM from 'react-dom';

    ReactDOM.render(React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Contacts"
      ),
      React.createElement(
        "form",
        {action: "person/new", method: "post"},
        React.createElement(
          "div",
          {className: "row"},
          React.createElement(
            "div",
            {className: "col-lg-6 col-md-8 col-sm-10"},
            React.createElement("input", {name: "name", className: "form-control", placeholder: "Name"}),
            React.createElement("br", null)
          )
        ),
        React.createElement(
          "div",
          {className: "row"},
          React.createElement(
            "div",
            {className: "col-lg-6 col-md-8 col-sm-10"},
            React.createElement("input", {name: "number", className: "form-control", placeholder: "Phone Number"}),
            React.createElement("br", null)
          )
        ),
        React.createElement(
          "div",
          {className: "row"},
          React.createElement(
            "div",
            {className: "col-lg-6 col-md-8 col-sm-10"},
            React.createElement(
              "button",
              {type: "submit", className: "btn btn-primary float-right"},
              "Submit"
            )
          )
        )
      ),
      React.createElement("br", null),
      React.createElement("br", null)
    ), document.getElementById('root'));

  }, {}]
}, {}, [1]);
