import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
 import queryString from 'query-string';
 import Books from './components/Books';



class App extends Component {

  constructor(props){
    super(props);

    this.state = { subjects: [] };
  };

  componentDidMount() {
    this.loadJson();


  };

  loadJson = () => {

      axios.get('http://localhost:3010/subjects')
        .then( (response) => {
          var data = response.data;
          this.setState({ subjects: data });
        })
        .catch( (error) => {
          console.log(error);
        });

    };

  render() {

    const Subjects = () => {
      const listItems = this.state.subjects.map((subject, index) =>
        <div className="w-50 d-inline-block pt-3"  key={index}>
          <div className="box center rounded bg-dark"><a className="centerText h5" href={'/books?subjects_like=' + subject }>{subject}</a></div>
        </div>
      );
      return (
      <div> {listItems} <hr /></div>
    );
    }

    const AboutComponent = () => {

      const parsed = queryString.parse(window.location.search);
      var subject = parsed.subjects_like;

      return ( <Books subject={subject} />);
    }


    return (
      <div>
        <div className="bg-secondary center my-5 rounded shadow" style={{width: "80%", minWidth: "700px"}}>

          <Router>

              <Route exact path='/' component={Subjects}></Route>
              <Route exact path='/subjects' component={Subjects}></Route>
              <Route exact path='/books' component={Subjects}></Route>
              <Route exact path='/books' component={AboutComponent}></Route>

          </Router>

        </div>
      </div>
    );
  }
}

export default App;
