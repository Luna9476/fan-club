import './App.css';
import { BrowserRouter, Redirect, Routes,Route, Switch, Link } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/layout/Layout';
import Manage from './pages/Manage';
import Shop from './pages/Shop'
import Myaccount from './components/Myaccount';
import RefundConfirm from './components/RefundConfirm';
import React, { Component } from 'react'


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/shop" element={<Shop />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/manage" element={<Manage />}></Route>
              <Route path="/myaccount" element={<Myaccount />}></Route>
              <Route path="/refundconfirm" element={<RefundConfirm />}></Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    )
  }
}
