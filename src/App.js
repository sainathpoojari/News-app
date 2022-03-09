import './App.css';
import React, { Fragment,useState } from 'react';
import Navbar from './Components/Navbar';
import Blog from './Components/Blog';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";


const App=()=> {
  const pageSize=9;
  const apiKey=process.env.REACT_APP_NEWS_API

  const[progress,setProgress]=useState(0)
    return (
      <div>
        <Router>
          <Fragment>
            <Navbar />
            <LoadingBar height={3}
        color='#f11946'
        progress={progress}
      />
            <Routes>
              <Route exact path="/"             element={<Blog setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
              <Route exact path="/business"     element={<Blog setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />} />
              <Route exact path="/entertainment"element={<Blog setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
              <Route exact path="/general"      element={<Blog setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
              <Route exact path="/health"       element={<Blog setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />} />
              <Route exact path="/science"      element={<Blog setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />} />
              <Route exact path="/sports"       element={<Blog setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />} />
              <Route exact path="/technology"   element={<Blog setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />} />
            </Routes>
          </Fragment>
        </Router>
      </div>
    )
}


export default App;
