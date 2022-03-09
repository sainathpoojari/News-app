import './App.css';
import React, { Component, Fragment } from 'react';
import Navbar from './Components/Navbar';
import Blog from './Components/Blog';
import LoadingBar from 'react-top-loading-bar'



import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


class App extends Component {
  pageSize=100;
  // apiKey='dce260f953ec48ffa94717ca5ae98d20'
  apiKey=process.env.REACT_APP_NEWS_API

  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Navbar />
            <LoadingBar height={3}
        color='#f11946'
        progress={this.state.progress}
      />
            <Routes>
              <Route exact path="/"             element={<Blog setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
              <Route exact path="/business"     element={<Blog setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" />} />
              <Route exact path="/entertainment"element={<Blog setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
              <Route exact path="/general"      element={<Blog setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
              <Route exact path="/health"       element={<Blog setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health" />} />
              <Route exact path="/science"      element={<Blog setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science" />} />
              <Route exact path="/sports"       element={<Blog setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
              <Route exact path="/technology"   element={<Blog setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
            </Routes>
          </Fragment>
        </Router>
      </div>
    )
  }
}


export default App;
