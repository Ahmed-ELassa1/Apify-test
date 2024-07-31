import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={ProductList} />
      </Routes>
      <ToastContainer
        limit={6}
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
}

export default App;
