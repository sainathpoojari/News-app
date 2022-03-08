import './App.css';
import React, { Component, Fragment } from 'react';
import Navbar from './Components/Navbar';
import Blog from './Components/Blog';



import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


class App extends Component {
  pageSize=100;
  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Navbar />
            <Routes>
              <Route exact path="/"             element={<Blog key="general" pageSize={this.pageSize} country="in" category="general" />} />
              <Route exact path="/business"     element={<Blog key="business" pageSize={this.pageSize} country="in" category="business" />} />
              <Route exact path="/entertainment"element={<Blog key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
              <Route exact path="/general"      element={<Blog key="general" pageSize={this.pageSize} country="in" category="general" />} />
              <Route exact path="/health"       element={<Blog key="health" pageSize={this.pageSize} country="in" category="health" />} />
              <Route exact path="/science"      element={<Blog key="science" pageSize={this.pageSize} country="in" category="science" />} />
              <Route exact path="/sports"       element={<Blog key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
              <Route exact path="/technology"   element={<Blog key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
            </Routes>
          </Fragment>
        </Router>
      </div>
    )
  }
}


export default App;
