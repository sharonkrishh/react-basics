import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import EmployeForm from './components/EmployeForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <EmployeForm/>
      </div>
    );
  }
}

export default App;
