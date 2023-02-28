import { Route, Routes } from "react-router-dom";
import Car from "./modulok/car";
import Login from "./modulok/Login";
import MainSite from "./modulok/mainsite";
import Register from "./modulok/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register authToken={""} onAuthTokenChange={function (token: string): void {
        throw new Error("Function not implemented.");
      } }/>}></Route>
      <Route path="/f1" element={<MainSite/>}></Route>
      <Route path="/*" element={<Login/>}></Route>
  </Routes>
    
  );
}

export default App;
