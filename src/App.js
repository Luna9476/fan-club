import './App.css';
import { BrowserRouter, Redirect, Routes,Route, Switch, Link } from 'react-router-dom'
import Home from './components/Home'
import PageNavbar from './components/PageNavbar';
import Manage from './components/Manage';
import React, { Component } from 'react'


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <PageNavbar></PageNavbar> 
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/manage" element={<Manage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}


