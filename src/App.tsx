import React from 'react';
import logo from './logo.svg';
import './App.css';
import getStripe from "../src/stripe/Stripe"

import Checkout from "./components/Checkout";
import CheckoutInApp from './components/checkoutInApp/CheckoutInApp';
import Success from "./components/Success";
import Cancel from "./components/Cancel";

import "@stripe/stripe-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Checkout />} />
          {/* <Route index element={<CheckoutInApp />} /> */}
          <Route path="success/:id" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
