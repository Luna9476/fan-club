import './App.css';
import { BrowserRouter, Redirect, Routes,Route, Switch, Link } from 'react-router-dom'
import Home from './components/Home'
import PageNavbar from './components/PageNavbar';
import Manage from './components/Manage';
import Myaccount from './components/Myaccount';
import RefundConfirm from './components/RefundConfirm';
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
            <Route path="/myaccount" element={<Myaccount />}></Route>
            <Route path="/refundconfirm" element={<RefundConfirm />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
