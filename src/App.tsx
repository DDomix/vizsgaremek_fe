import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Car from "./modulok/car";
import Drivers from "./modulok/drivers";
import Login from "./modulok/Login";
import MainSite from "./modulok/mainsite";
import Register from "./modulok/register";
import Shop from "./modulok/shop";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login authToken={""} onAuthTokenChange={function (token: string): void {
        throw new Error("Function not implemented.");
      } } />}></Route>
      <Route path="/register" element={<Register authToken={""} onAuthTokenChange={function (token: string): void {
        throw new Error("Function not implemented.");
      } }/>}></Route>
      <Route path="/f1" element={<MainSite/>}></Route>
      <Route path="/*" element={<Login authToken={""} onAuthTokenChange={function (token: string): void {
        throw new Error("Function not implemented.");
      } }/>}></Route>
      <Route path="/car" element={<Car/>}></Route>
      <Route path="/drivers" element={<Drivers/>}></Route>
      <Route path="/shop" element={<Shop/>}></Route>
  </Routes>
    
  );
}

export default App;
